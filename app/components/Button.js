const Button = ({ children, className, onClick }) => {
    return (
      <button
        className={`p-2 bg-slate-100 rounded-md hover:ring-2 hover:ring-gray-400 ml-8 ${className}`}
        onClick={onClick}
      >{children}</button>
    )
  }
  
  export default Button