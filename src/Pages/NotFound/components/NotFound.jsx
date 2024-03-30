import pagePhto from "./img/not-found.png";
function NotFound() {
  return (
    <>
     <img className='w-75 text-center mx-auto d-block mb-3' src={pagePhto} alt="Not found" />
     <h2 className='pb-2 mb-4 text-primary border-bottom border-primary text-center'>This content is currently unavailable</h2>
    </>
  )
}

export default NotFound;