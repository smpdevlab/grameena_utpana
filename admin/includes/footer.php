
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>

<script src="https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>

<script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js"></script>


<script>

$(document).ready(function () {

    $('#entriesTable').DataTable({

        pageLength: 25,

        order: [[0, 'desc']],

        dom: 'Bfrtip',

        buttons: [

            {
                extend: 'excelHtml5',
                text: 'Export Excel'
            }

        ]

    });

});

</script>

</body>
</html>