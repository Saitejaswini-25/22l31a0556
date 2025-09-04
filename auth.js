const axios = require('axios');

async function register() {
  try {
    const response = await axios.post('http://20.244.56.144/evaluation-service/auth',{
        email:"saitejasiwnigorantla@gmail.com",
      name: "Sai Tejaswini",         
      mobileNo: "9100100649",      
      githubUsername: "saitejaswini-25",     
      rollNo: "22l31a0556",               
      accessCode: "YzuJeU",
       clientID: '8d8ea9c0-04ed-41b8-a786-ebf559c9d0f7',
  clientSecret: 'UkrvVjJtzTDUGSTY'        
    });

    console.log("✅ Success:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("❌ Error:", error.response.data);
    } else {
      console.error("❌ Error:", error.message);
    }
  }
}

auth();
