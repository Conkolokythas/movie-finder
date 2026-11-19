
const Pagination = ({ results, term, api, route}) => {

let pages = results/2;
let items = [];

for (let i = 0; i <= pages; i++) {
  items.push(
    <a href={api + route + '?s=' + term + '&page=' + i}>{i}</a>
  );
}

return (
        <>
            {items}
        </>
        
  )

}

export default Pagination