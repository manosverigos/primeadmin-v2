exports.editOffer = (offer) => {

  let first_part =  `<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Επεξεργασία προσφοράς</title>
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
      <style type="text/css">
      .nav {
        padding: 30px;
      
      }
      
      .addLine{
        margin-top: 10px;
      }
      .delBtn {
        padding-left: 0;
      }
      .add-offer {
        height: 40px;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      
      #search-bar {
        width: 100%;
        margin-left: 75px;
        margin-top:15px;
      }
      
      .btn-search-cont{
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      
      .btn-search{
        margin-right: 75px;
      }
      
      .nav-item {
        display: flex;
        align-items: center;
      }
      
      .home {
        font-size: x-large;
      }
      
      .title {
        margin:20px 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .offer_card {
        width: 75%;
        margin: 25px auto;
      }
      
      .card-header {
        font-size: x-large;
      }
      
      .form-label {
        margin-top: 15px
      }
      
      .btn-primary {
        margin-top: 15px;
      }
      
      
      .btn-add-offer {
        margin-right: 75px;
        margin-top: 0;
      }
      
      .message-form, #offer-card {
        width: 75%;
        margin: 30px auto;
      }
      
      .filter-message{
        width: 200px;
        margin-left: 75px;
      }
      
      .row-cacl {
        margin: 10px;
      
      }
      
      .container-cacl{
        width: 50%
      }
      
      .btn-cacl{
        margin: 15px;
      }
      
      .buttons{
        display: flex;
        justify-content: center;
      }
      
      .result{
        display: flex;
        justify-content: center;
      }
      
      .filter {
        width: 100px;
        margin-left: 75px
      }
      
      .filter-form{
        width:70%
      }
      
      .f-grey{
        color: rgb(116, 116, 116);
      }
      
      .card-info{
        margin:10px
      }
      
      .main{
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .message{
        margin-top: 20%;
        width: 50%;
        font-size: 40px;
        text-align: center;
      }
      
      .login-title .login-form{
        display: block;
      }
      
      .login-title{
        text-align: center;
      }
      
      .login-form-actual{
        width: 50%;
        margin: 0 auto;
      }
      
      .buttons-container{
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      /* .a-edit{
       float: left;
       clear: none;
      } */
      
      
      #timeline{
        display: flex;
        justify-content: center;
        margin: 25px;
      }
      
      .mobile-nav{
        display: none;
      }
      
      #pagination {
        display: flex;
        justify-content: center;
      }
      
      @media only screen and (max-width: 600px) {
        .message-form{
          width:90%
        }
      
        .filter-message{
          margin-left: 5%;
        }
      
        #search-bar {
          width: 100%;
          margin-left: 10px;
          margin-top:15px;
        }
        
        .btn-search-cont{
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
        
        .btn-search{
          margin-right: 10px;
        }
      
        .mobile-nav{
          display: block
        }
      
        .desktop-nav{
          display: none
        }
      
        .message {
          width: 80%
        }
      
        .filter{
          margin-left: 10px;
        }
      
        .filter-form{
          width: 100%;
        }
        
        .btn-add-offer {
          margin-right: 0px;
        }
      
        .add-link{
          padding-right: 10px;
        }
        .card-info{
          margin: 10px 0 ;
        }
      
        .col-6 {
          padding: 5
        }
      
        .offer-complete{
          position: relative;
          left: -77px;
        }
      
        .offer_card{
          width: 90%;
        }
        html{
          overflow-x: hidden;
        }
      
        body, html {
          overflow-x: hidden;
        }
      }
      </style>
    <script>
  
      validateForm = () =>{
        const form = document.getElementById('offer')
        form.className='was-validated'
      }

      setType = () => {
        if('${offer.type}' == 'time') {
          console.log('time')
          document.getElementById('selected_type').textContent = 'Βάσει χρόνου'
        } else if ('${offer.type}' == 'sales'){
          document.getElementById('selected_type').textContent = 'Βάσει πωλήσεων'
        }
      }

      displayInput = () => {
        const type_container = document.getElementById('type')
        type_container.innerHTML = ''
        
        if ('${offer.type}' == 'time') {

          let today = new Date();
          const dd = String(today.getDate()).padStart(2, '0');
          const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          const yyyy = today.getFullYear();
          today = yyyy + '-' + mm + '-' + dd;
          

          const labelEnd = document.createElement('label')
          labelEnd.setAttribute("for", 'endDate')
          labelEnd.className = 'form-label'
          const textEnd = document.createTextNode('Ημερομηνία λήξης')
          labelEnd.appendChild(textEnd)
          type_container.appendChild(labelEnd)
  
          const inputEnd = document.createElement('input')
          inputEnd.id = 'endDate'
          inputEnd.setAttribute("name", "endDate")
          inputEnd.setAttribute("type", "date")
          inputEnd.setAttribute("value",'${offer.endDate}')
          inputEnd.className = 'form-control'
          inputEnd.required = true;
          type_container.appendChild(inputEnd)
          
          const labelProd = document.createElement('label')
          labelProd.setAttribute("for", 'products')
          labelProd.className = 'form-label'
          const textProd = document.createTextNode('Προϊόν / Εταιρία')
          labelProd.appendChild(textProd)
          type_container.appendChild(labelProd)
  
          const inputProd = document.createElement('input')
          inputProd.id = 'products'
          inputProd.setAttribute("name", "products")
          inputProd.setAttribute("type", "text")
          inputProd.setAttribute("value",'${offer.products[0].desc}')
          inputProd.className = 'form-control'
          inputProd.required = true;
          type_container.appendChild(inputProd)
  
        } else if (val = 'sales') {
          const divCol1 = document.createElement('div')
          const divCol2 = document.createElement('div')
          const divCol3 = document.createElement('div')
          const divCol4 = document.createElement('div')

          const labelRow = document.createElement('row')
          labelRow.className = 'row'

          divCol1.className = 'col'
          divCol2.className = 'col'
          divCol3.className = 'col'

          const label1 = document.createElement('label')
          label1.className = 'form-label'
          const textStart1 = document.createTextNode('Προϊόν')
          label1.appendChild(textStart1)

          const label2 = document.createElement('label')
          label2.className = 'form-label'
          const textStart2 = document.createTextNode('Περιγραφή')
          label2.appendChild(textStart2)

          const label3 = document.createElement('label')
          label3.className = 'form-label'
          const textStart3 = document.createTextNode('Πωλήσεις')
          label3.appendChild(textStart3)

          divCol1.appendChild(label1)
          divCol2.appendChild(label2)
          divCol3.appendChild(label3)

          labelRow.appendChild(divCol1)
          labelRow.appendChild(divCol2)
          labelRow.appendChild(divCol3)
          
          type_container.append(labelRow)
          `

          let second_part='';
          let count = 1;
          for(prod of offer.products){

            second_part += `
            const inputRow${count} = document.createElement('div')
            inputRow${count}.className = 'row inputProductRow addLine'

            const divInputCol1${count} = document.createElement('div')
            const divInputCol2${count} = document.createElement('div')
            const divInputCol3${count} = document.createElement('div')

            divInputCol1${count}.className = 'col'
            divInputCol2${count}.className = 'col'
            divInputCol3${count}.className = 'col'

            const input1${count} = document.createElement('input')
            input1${count}.id = 'product${count}'
            input1${count}.setAttribute("name", 'products[${count}][productID]')
            input1${count}.setAttribute("readonly", 'readonly')
            input1${count}.setAttribute("type", "number")
            input1${count}.setAttribute("placeholder", "Eshop ID")
            input1${count}.className = 'form-control'
            input1${count}.value = '${prod.productID}'
            input1${count}.required = true;
            

            const input2${count} = document.createElement('input')
            input2${count}.id = 'desc${count}'
            input2${count}.setAttribute("name", 'products[${count}][desc]')
            input2${count}.setAttribute("type", "text")
            input2${count}.setAttribute("placeholder", "Περιγραφή")
            input2${count}.value = '${prod.desc}'
            input2${count}.className = 'form-control'

            const input3${count} = document.createElement('input')
            input3${count}.id = 'sales_num${count}'
            input3${count}.setAttribute("name", 'products[${count}][sales_num]')
            input3${count}.setAttribute("type", "number")
            input3${count}.setAttribute("placeholder", "Όριο")
            input3${count}.className = 'form-control'
            input3${count}.value = '${prod.sales_num}'
            input3${count}.required = true;

            divInputCol1${count}.appendChild(input1${count})
            divInputCol2${count}.appendChild(input2${count})
            divInputCol3${count}.appendChild(input3${count})

            inputRow${count}.appendChild(divInputCol1${count})
            inputRow${count}.appendChild(divInputCol2${count})
            inputRow${count}.appendChild(divInputCol3${count})

            type_container.appendChild(inputRow${count})
            `
            count++
          }


          let third_part = `
          
        
        }
      }
    </script>
  </head>
  
  <body>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mobile-nav">
    <div class="container-fluid">
      <a class="navbar-brand" href="../../index.html">Prime Admin Page</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="../../offers/index.html">Προσφορές</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="../../calc.html">Υπολογιστής τιμής
            </a>
          </li>
          <li class="nav-item">
          <a class="nav-link" href="../../message.html">Μηνύματα
          </a>
          </li>
          </ul>
      </div>
    </div>
  </nav>
    <ul class="nav nav-pills nav-fill shadow p-3 mb-5 bg-body rounded desktop-nav">
      <li class="nav-item">
        <a class="nav-link home" href="../../index.html" tabindex="-1" aria-disabled="true">Prime Admin Page</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="../../offers/index.html">Προσφορές</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="../../calc.html">Υπολογιστής τιμής</a>
      </li>
      <li class="nav-item">
      <a class="nav-link" href="./message.html">Μηνύματα
      </a>
      </li>
    </ul>
    <div class='title'>
      <h5 class="card-title">Επεξεργασία προσφοράς</h5>
    </div>
    <div id="offer-card" class="shadow-sm p-3 mb-5 bg-body rounded">
      <form action="/api/offers/edit" id='offer' method='POST'>
        <label for='_id' class="form-label">ID</label>
        <input id="disabledTextInput" name='_id' type="text" class="form-control" value = '${offer._id}' readonly="readonly">

        <label for='title' class="form-label">Τίτλος</label>
        <input id='title' name='title' type="text" placeholder="Τίτλος" class="form-control" value = '${offer.title}' required>
  
        <label for='based_on' class="form-label">Τύπος</label>
        <select id='based_on' name='type' aria-label="Disabled select example" disabled class="form-control">
          <option id='selected_type' value= '${offer.type}' disabled selected>
          </option>
        </select>
  
        <label for='startDate' class="form-label">Ημερομηνία έναρξης</label>
        <input id='startDate' name='startDate' type="date" placeholder="Ημερομηνία έναρξης" class="form-control" value = '${offer.startDate}' required>

        <div id="type"></div>

        <label for="comment" class="form-label">Ολοκλήρωση</label>
        <textarea id='comment' rows='4' cols='50' name='comment' type="text" class="form-control" required>${offer.comment}</textarea>
        <input type="submit" class="btn btn-primary" value='Επιβεβαίωση' onclick="validateForm()">
      </form>
    </div>
    <script>
      displayInput()
      setType()
      console.log('ok')
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous">
    </script>
  </body>
  
  </html>`
  return first_part + second_part + third_part
}