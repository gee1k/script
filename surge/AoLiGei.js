let obj = JSON.parse($response.body);
obj.data.status = 1;  
$done({body: JSON.stringify(obj)});