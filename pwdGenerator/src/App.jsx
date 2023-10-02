import { useState ,useCallback,useEffect,useRef} from 'react'


function App() {
  const [length,setLength]=useState(8)
  const [numAllow,setNumAllow]=useState(false)
  const [charAllow,setCharAllow]=useState(false)
  const [password,setPassword]=useState("")
  //useref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
     let pass=""
     let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

     if(numAllow) str+="1234567890"
     if(charAllow) str+="!@#$%^&*-?_)+({}[]`~"

     for(let i=0;i<length;i++){
      pass+=str.charAt(Math.floor((Math.random()*str.length+1)))
     }
     setPassword(pass)
  },[length,numAllow,charAllow,setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,password.length)
    window.navigator.clipboard.writeText(password)
  },[password])
  
// setPassword in useCallback and passwordGenerator in useEffect are not necessary added for optimisation
// useeffect first runs as page loads and later runs when any of the dependencies changes
  useEffect( ()=> {
    passwordGenerator()
  },[length,numAllow,charAllow,passwordGenerator])
    
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg 
      px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>
          Password Generator
        </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
           <input type="text" 
           value={password}
           className='outline-none w-full py-1 px-3'
           placeholder='password'
           readOnly
           ref={passwordRef}
           />
           <button className='outline-none bg-blue-700 text-white
           px-3 py-0.5 shrink-0'
           onClick={copyPasswordToClipboard}>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label >Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-2'>
             <input type="checkbox" 
             defaultChecked={numAllow}
             onChange={()=> {
              setNumAllow((prev)=>!prev);
              }}
              />
              <label>Numbers</label>

              <input type="checkbox" 
             defaultChecked={charAllow}
             onChange={()=> {
              setCharAllow((prev)=>!prev);
              }}
              />
              <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )

}


export default App
