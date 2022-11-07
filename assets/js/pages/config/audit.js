// BEGIN: Initial
document.getElementById('btn-clear').addEventListener('click', function() {
    Array.from(document.getElementsByClassName('flatpickr-basic')).map(node => {
        node.flatpickr().clear();
    })
})
// END: Initial