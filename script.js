const defaultListings = [
  {name:"Gaming Controller",price:18,category:"Games",emoji:"🎮"},
  {name:"Friendship Bracelet Set",price:6,category:"Art",emoji:"📿"},
  {name:"LEGO Mini Set",price:12,category:"Toys",emoji:"🧱"},
  {name:"Mystery Book Bundle",price:8,category:"Books",emoji:"📚"},
  {name:"Plush Bear",price:10,category:"Toys",emoji:"🧸"},
  {name:"Custom Drawing",price:5,category:"Art",emoji:"🎨"}
];

let listings = JSON.parse(localStorage.getItem("kidmarket-listings") || "null") || defaultListings;

function money(n){return "$"+Number(n).toFixed(2).replace(".00","")}
function renderListings(){
  const q=document.getElementById("search").value.toLowerCase().trim();
  const cat=document.getElementById("category").value;
  const shown=listings.filter(x=>(cat==="All"||x.category===cat)&&x.name.toLowerCase().includes(q));
  document.getElementById("listingGrid").innerHTML=shown.length ? shown.map(x=>`
    <article class="listing">
      <div class="listing-pic">${escapeHtml(x.emoji||"📦")}</div>
      <h3>${escapeHtml(x.name)}</h3>
      <div class="meta">${escapeHtml(x.category)} • Parent-approved prototype listing</div>
      <div class="price-row"><span class="price">${money(x.price)}</span><span class="tag">SAFE LISTING</span></div>
    </article>`).join("") : `<p>No listings found. Try another search.</p>`;
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function openSell(){document.getElementById("sellModal").classList.remove("hidden");document.getElementById("itemName").focus()}
function closeSell(){document.getElementById("sellModal").classList.add("hidden")}
function addListing(e){
  e.preventDefault();
  const item={name:document.getElementById("itemName").value,price:Number(document.getElementById("itemPrice").value),category:document.getElementById("itemCategory").value,emoji:document.getElementById("itemEmoji").value||"📦"};
  listings.unshift(item);
  localStorage.setItem("kidmarket-listings",JSON.stringify(listings));
  e.target.reset(); closeSell(); renderListings(); location.hash="browse";
}
document.getElementById("sellModal").addEventListener("click",e=>{if(e.target.id==="sellModal")closeSell()});
renderListings();