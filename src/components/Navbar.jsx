
const Navbar = () => {
  return (
    <nav className="bg-purple-200 ">
      <div className="mx-auto flex justify-between items-center h-14 px-40">

        <div className="logo">KeyKeep</div>
        <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold" href="/">Home</a>
            <a className="hover:font-bold hover:mx-auto" href="#">About</a>
            <a className="hover:font-bold" href="#">Contact</a>
          </li>
        </ul>

      </div> 
    </nav>
  )
}

export default Navbar;

