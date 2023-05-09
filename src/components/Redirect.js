import React, { useEffect } from "react";
import { db } from "../firebase";
import { useParams } from "react-router-dom";

function Redirect() {

  // Youtube token
  const youtubeToken = 'QUFFLUhqa1JrQVVqczVmT1dUcnA2ZDVFMjNFSGZDMzF4d3xBQ3Jtc0ttV3JQLW0wMUF5MVEwUENpRjBtcTdjVjV4OWFYSDVLUldicHA0UmsybDNoYXpNSENDY1pmZldDVkRuWi03OWtjTUxOZ1pyQzIwaVZPWDI1TjB0NmpkeUxkd19OOGFaUTNYbGxqT191MUdfUUM3ZURaYw'

const {slug} = useParams()
    useEffect(() => {
        let query = db.collection('urls').where('slug', '==', slug)
        query.onSnapshot((data)=>{
            if(data.empty){
                alert('URL not found')
            }
            let finalData = data.docs[0].data()
            let url = finalData.url
            window.location.href = `vnd.youtube://youtube.com/redirect?event=comments&redir_token=${youtubeToken}&q=${url}&html_redirect=1`
        })
    }, [slug])

return (
  <div className="pt-56">
    <h1 className="text-green-500 text-xl text-center italic">Success</h1>
    <p className="opacity-0 px-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut magnam modi, nulla repellendus quaerat quisquam quis porro inventore, voluptatum quia necessitatibus nisi iure nam repudiandae ipsa magni est veniam mollitia!</p>
  </div>
);
}

export default Redirect;
