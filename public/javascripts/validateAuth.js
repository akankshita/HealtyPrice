 
 function  FormValidations(id){
                  

var promo_service_id =document.getElementById('promo_service_id').value;

 var discount =document.getElementById('discount').value;
 var date_from_iddate =document.getElementById('date_from_iddate').value;
 var date_to_iddate =document.getElementById('date_to_idlastdate').value;

 document.getElementById("service_id").innerHTML=" "
 document.getElementById("dis").innerHTML=" "
 document.getElementById("date_form").innerHTML=" "
 document.getElementById("date_to").innerHTML=" "


 var msg='false';
 if(promo_service_id ==''){

 msg='true';
 document.getElementById("service_id").innerHTML="Please Select Service";
 document.getElementById("promo_service_id").focus();
 }

 if(discount==''){


 msg='true';
 document.getElementById("dis").innerHTML="Enter Discount According to Service";
 document.getElementById("dis").focus();
 }
 if(date_from_iddate ==''){
 msg='true';
 document.getElementById("date_form").innerHTML="Please Select Start Date For Discount";
 document.getElementById("date_from_iddate").focus();
 }

 if(date_to_iddate ==''){
 msg='true';
 document.getElementById("date_to").innerHTML="Please Select End Date For Discount";
 document.getElementById("date_to_idlastdate").focus();
 }

if (isNaN(discount)==true){
  msg = 'true'
document.getElementById("dis").innerHTML="it should be numeric"
document.getElementById("dis").focus();
}

if (discount > 99){
  msg = 'true'
  document.getElementById('dis').innerHTML = "Discount should not be greater than 99"
  document.getElementById("dis").focus();
}

 if (discount < 0){
  msg = 'true'
  document.getElementById('dis').innerHTML = "Discount should not be less than Zero"
  document.getElementById('dis').focus();
 } 

 if(msg=='false')
 return true;
 else
 return false;


 }

