
const Pagination = ({ results, term, api}) => {

let pages = results/2;
let items = [];

for (let i = 0; i <= pages; i++) {
  items.push(
    <a href={api + '/page' + '?s=' + term + '&page=' + i}>{i}</a>
  );
}

return (
        <>
            {items}
        </>
        
  )

}

export default Pagination