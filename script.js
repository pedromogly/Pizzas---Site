let cart = [];
let modalQt = 1;
let modalKey = 0;

//usando a constante c para guardar a função de querySelector
//Código mais organizado e sem a necessidade de repetições
const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);
//listagem das pizzas
pizzaJson.map((item, index)=>{
    //clonando a div models
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    // preenche as informações em pizzaitem
    
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    
    pizzaItem.querySelector('a').addEventListener('click',(e)=> {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;
        
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        })
        
        c('.pizzaInfo--qt').innerHTML = modalQt;
        
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=> {
            c('.pizzaWindowArea').style.opacity = 0.5;
        }, 400);
        setTimeout(()=> {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 400);
    })
                                                  
                                                  
    c('.pizza-area').append(pizzaItem);
    // poderiamos usar o innerHTML para fazer a listagem, mas ele iria sobrepor
    // queremos adicionar listagem com listagem, então usamos o append()
    });

//Eventos do MODAL
function closeModal() {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display ='none';
    }, 300);
}

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=> {
    item.addEventListener('click', closeModal);
})

c('.pizzaInfo--qtmenos').addEventListener('click', ()=> {
    if (modalQt > 1) {
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
        }
})

c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
})

cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
          size.addEventListener('click', (e)=> {
              c('.pizzaInfo--size.selected').classList.remove('selected');
              size.classList.add('selected');
          })
        })

c('.pizzaInfo--addButton').addEventListener(click, ()=> {
    //Qual a pizza?
    console.log("Pizza: "+modalKey);
    //Qual o tamanho?
    let size = c('.pizzaInfo--size.selected').getAttribute('data-key');
    //Quantas pizzas?
    console.log("Quantidade: "+modalQt);
})