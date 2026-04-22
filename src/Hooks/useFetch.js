import { useEffect,useState } from "react";

  const  useFetch=(url,delay=0)=>{
       const [data,setData]=useState([])
       const [loading,setLoading]=useState(false)
       const [error,setError]=useState(null)

      useEffect(()=>{
        if(!url) return;

        setLoading(true);
        setError(null);

        const timer=setTimeout(()=>{
            fetch(url)
            .then(res=>res.json())
            .then(res=>setData(res.results || []))
            .catch(()=>setError("Failed to Load"))
            .finally(()=> setLoading(false))
        },delay)
        return()=>clearTimeout(timer)
      },[url,delay])
      return{data,loading,error}

  };

  export default useFetch;

