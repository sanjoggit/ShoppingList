const addButton       = document.getElementById('addBtn');
const newItem         = document.getElementById('newItem');
const amount          = document.getElementById('amount');
const ulItemList      = document.getElementById('ul-item-list');
const listItem        = document.querySelectorAll('li');
const deleteButton    = document.querySelectorAll('.delete');
const inputBox        = document.getElementsByClassName('check');
const ulItemShopped   = document.getElementById('ul-item-shopped');

//add item
addButton.addEventListener('click', addItem);
//delete item
deleteButton.forEach(function(element, i){
  element.addEventListener('click', () => listItem[i].remove());
});
//to shopped item
Array.from(inputBox).forEach(function(element, i){
  element.addEventListener('click', (e)=>{
    const cloneList = e.path[2].cloneNode(true);
     cloneList.childNodes[3].childNodes[1].childNodes[3].className = 'fa fa-undo fa-stack-1x fa-inverse';
     cloneList.childNodes[1].removeChild(cloneList.childNodes[1].childNodes[1]);
    const appendedLi = ulItemShopped.appendChild(cloneList);
    appendedLi.childNodes[3].childNodes[3].childNodes[3].addEventListener('click', ()=>appendedLi.remove());//clicking delete icon in appended
    appendedLi.childNodes[3].childNodes[1].childNodes[3].addEventListener('click', ()=>{ //clicking undo icon
      const appendedCloned = appendedLi.cloneNode(true);
      appendedCloned.childNodes[3].childNodes[1].childNodes[3].className = 'fa fa-pencil fa-stack-1x fa-inverse';
      appendedCloned.childNodes[3].childNodes[3].addEventListener('click', ()=>itemClonedToShop.remove());
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.className = 'check';
      appendedCloned.childNodes[1].insertBefore(input, appendedCloned.childNodes[1].childNodes[0]);
      const itemClonedToShop = ulItemList.appendChild(appendedCloned); // li cloned back to items to shop
      cloneList.remove();
    });
    setTimeout(function(){
      e.path[2].remove();
    }, 300);
  })
});



const createList = ()=>{
  const li = document.createElement('li');
  const label = document.createElement('label');
  label.className = 'list-label';
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.className = 'check';
  const span = document.createElement('span');
  span.className = 'list-item';
  span.innerHTML = newItem.value+'-'+amount.value;
  const div = document.createElement('div');
  div.className = 'edit-delete';
  const span2 = document.createElement('span');
  span2.className = 'fa-stack fa-lg';
  const i1 = document.createElement('i');
  i1.className = 'fa fa-square fa-stack-2x';
  const i2 = document.createElement('i');
  i2.className = 'fa fa-pencil fa-stack-1x fa-inverse';
  const span3 = document.createElement('span');
  span3.className = 'fa-stack fa-lg';
  const i3 = document.createElement('i');
  i3.className = 'fa fa-square fa-stack-2x';
  const i4 = document.createElement('i');
  i4.className = 'fa fa-trash fa-stack-1x fa-inverse';
  label.appendChild(input);
  label.appendChild(span);
  div.appendChild(span2);
  div.appendChild(span3);
  span3.appendChild(i3);
  span3.appendChild(i4);
  span2.appendChild(i1);
  span2.appendChild(i2);
  li.appendChild(label);
  li.appendChild(div);
  return li;
}

function addItem(){
  if(!newItem.value.length==0){
    const addedElement = ulItemList.appendChild(createList());
    addedElement.childNodes[0].childNodes[0].addEventListener('click', function(e){
      cloneList = e.path[2].cloneNode(true);
      cloneList.childNodes[0].childNodes[0].remove();
      cloneList.childNodes[1].childNodes[0].childNodes[1].className = 'fa fa-undo fa-stack-1x fa-inverse';
      const appendedLi = ulItemShopped.appendChild(cloneList);
      //console.log(appendedLi);
      appendedLi.childNodes[1].childNodes[1].addEventListener('click', ()=>appendedLi.remove());
      appendedLi.childNodes[1].childNodes[0].addEventListener('click', ()=>{
        const appendedCloned = appendedLi.cloneNode(true);
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.className = 'check';
        appendedCloned.childNodes[0].insertBefore(input, appendedCloned.childNodes[0].childNodes[0]);
        appendedCloned.childNodes[1].childNodes[0].childNodes[1].className = 'fa fa-pencil fa-stack-1x fa-inverse';
        const itemClonedToShop = ulItemList.appendChild(appendedCloned); // li cloned back to items to shop
        console.log(itemClonedToShop);
        itemClonedToShop.childNodes[1].childNodes[1].childNodes[1].addEventListener('click', console.log('fa'));

        appendedLi.remove();
      });
      setTimeout(function(){
        e.path[2].remove();
      }, 300);
    });
  }
}


//for showing and hiding shopped item
$('#item-shopped').click(function(){
  $('#ul-item-shopped').slideToggle(500);
  $('#toggle-icon').toggleClass('fa-caret-down fa-caret-up');
});
