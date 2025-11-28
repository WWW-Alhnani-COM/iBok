const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const toast = document.getElementById('toast');
let selectedRequest = null;

checkboxes.forEach(ch => {
    ch.addEventListener('change', function () {
        if(this.checked){
            selectedRequest = this.getAttribute('data-action');
            toast.innerText = selectedRequest;
            toast.style.display = 'block';
            setTimeout(()=> { toast.style.display = 'none'; }, 2500);
        }
    });
});

const whatsappBtn = document.getElementById('whatsappBtn');
whatsappBtn.addEventListener('click', () => {
    if(!selectedRequest) {
        alert('الرجاء اختيار خدمة أولاً');
        return;
    }
    const userID = sessionStorage.getItem('userID') || '1234567';
    const phoneNumber = '201000000000'; // رقم واتساب الرئيس
    const message = `مرحباً، أود تأكيد طلبي: ${selectedRequest}. رقم حسابي: ${userID}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
});
