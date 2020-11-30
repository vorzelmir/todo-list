  const $list = $(".list");
  const $input = $("#add-input");
  const $add = $("#add-submit");
  const $item = $('.item');
  const $searchInput = $('#search-input');
  const $search = $('#search-submit');

  let $inValue = {};

  localStorage.clear();
  
  $input.on('focus', function(event) {
    event.preventDefault();
    $input.val('');
  });


  let count = 0;
  const todos = [];

  $add.on('click', function(event) {
    event.preventDefault();
    count++;
    $inValue.text = $input.val()
    $inValue.done = false;
    todos.push($inValue);
    localStorage.setItem(`todos${count}`, JSON.stringify($inValue));
    
    let temp = todos[todos.length-1];
    let $liItem = $(`<li class="item" id="item${count}"><span class="item-text">${temp.text}</span>
                     <button class="item-done" id="done${count}">Done</button>
                     <button class="item-remove" id="remove${count}">Remove</button></li>`);
    $list.append($liItem);
  });



  document.addEventListener('click', function(event) {
    if (hasClass(event.target, 'item-remove')) {
      const currentId = event.target.id;
        $(`.item#item${getId(currentId)}`).remove();
    }
  });

 

  $searchInput.on('focus', function(event) {
    event.preventDefault();
    $(this).val('');
  });


  $search.on('click', function(event) {
    event.preventDefault();
    let values = Object.values(localStorage);
    const temp = $searchInput.val();
    let res;
    for (let i = 0; i < values.length; i++) {
      let t = JSON.parse(values[i])
      if (t.text === temp) {
        res = i;
      }
    }
    $(`.item#item${res}`).addClass('select');
  });


  document.addEventListener('click', function(event) {
    event.preventDefault();
    if (hasClass(event.target, 'item-done')){
      const currentId = event.target.id;
      $(`.item#item${getId(currentId)}`).addClass('done');
    }
  });
  

  function hasClass(elem, className) {
    return elem.classList.contains(className);
  }

  function getId(str) {
    return parseInt(str.match(/\d+/g)[0])
  }
  


