const toggleBtn = document.querySelector('.toggle_btn');
toggleBtn.addEventListener('click', function(){
    const menuEle = document.querySelector('.menu');
    menuEle.classList.toggle('on');
})

function setMenu(_menu){
    const menu_Btn = document.querySelectorAll('nav li');
    menu_Btn.forEach(Btn => {
        Btn.classList.remove('on');
    })
    document.querySelector('nav li.' + _menu).classList.add('on');
    document.querySelector('main').className = _menu;
}

function setDescLength(){
    document.querySelector('.descLength').innerHTML = document.querySelector('input.description').value.length + '/20';
}

function editMyinfo(on){
    document.querySelector('#myinfo > div').className = on ? 'edit' : 'non-edit';
    document.querySelectorAll('#myinfo input').forEach(input => {
        input.disabled = !on;
    })
    showMyinfo();
}

function showMyinfo(){
    document.querySelector('#myinfoID').innerHTML = my_info.id;
    document.querySelector('#myinfoUser').innerHTML = my_info.user_name;
    document.querySelector('#ip-intro').value = my_info.instruction;
    document.querySelector('#sp-intro').innerHTML = my_info.instruction;
    document.querySelector('#myinfo input[type=radio][value=' + my_info.as + ']').checked =true;
    document.querySelectorAll('#myinfo input[type=checkbox]').forEach( checkbox => {
        checkbox.checked = false;
    })
    my_info.interest.forEach( interest => {
        document.querySelector('#myinfo input[type=checkbox][value=' + interest +']').checked = true;
    })
}

function updateMyinfo(){
    my_info.instruction  = document.querySelector('#ip-intro').value;
    my_info.as = document.querySelector('#myinfo input[type=radio]:checked').value;
    let interest = [];
    document.querySelectorAll('#myinfo input[type=checkbox]:checked').forEach(checked => {
        interest.push(checked.value);
    })
    my_info.interest = interest
    editMyinfo(false)
}

const sorts = {
    recent:function(a,b){return b.idx - a.idx},
    like:function(a,b){return b.likes - a.likes}
}

const filters = {
    all:function(it){return true},
    mine:function(it){return it.user_id === my_info.id},
    like:function(it){return my_info.like.indexOf(it.idx) > -1},
    follow:function(it){return my_info.follow.indexOf(it.user_id) > -1}
}

let sort = sorts.recent;
let filter = filters.all;

function setSort(_sort){
    sort = sorts[_sort];
    const sortBtn = document.querySelectorAll('#sorts li')
    sortBtn.forEach(btn => {
        btn.classList.remove('on')
    })
    document.querySelector('#sorts .' + _sort).classList.add('on')
    showPhotos()    
}

function setFilter(_filter){
    filter = filters[_filter]
    const filterBtn = document.querySelectorAll('#filters li')
    filterBtn.forEach(btn => {
        btn.classList.remove('on')
    })
    document.querySelector('#filters .' + _filter).classList.add('on')
    showPhotos()
}

function showPhotos(){
    const existingNodes = document.querySelectorAll('#gallery article:not(.hidden)');
    existingNodes.forEach(existingNode => {
        existingNode.remove();
    });
    const gallery = document.querySelector('#gallery');

    let filtered = photos.filter(filter);
    filtered.sort(sort);

    filtered.forEach(photo => {
        const photoNode = document.querySelector('article.hidden').cloneNode(true);
        photoNode.classList.remove('hidden');

        photoNode.querySelector('.photo').style.backgroundImage
        = "url('./img/photo/"+photo.file_name+"')";
        photoNode.querySelector('.like').innerHTML = photo.likes;
        photoNode.querySelector('.author').innerHTML = photo.user_name;
        photoNode.querySelector('.desc').innerHTML = photo.description;

        photoNode.querySelector('.like').addEventListener('click', function(){
            togglelike(photo.idx);
        })

        photoNode.querySelector('.author').addEventListener('click',function(){
            toggleFollow(photo.user_id);
        })
        if(my_info.like.indexOf(photo.idx) > -1 ){
            photoNode.querySelector('.like').classList.add('on');
        }
        if(my_info.follow.indexOf(photo.user_id) > -1){
            const followSpan = document.createElement('span');
            followSpan.innerHTML = 'FOLLOW';
            photoNode.querySelector('.author').append(followSpan);
        }
        gallery.append(photoNode);
    })
}

function togglelike(idx){
    if(my_info.like.indexOf(idx) === -1){
        my_info.like.push(idx);
        for(var i = 0 ; i < photos.length; i++){
            if(photos[i].idx === idx){
                photos[i].likes++;
                break;
            }
        }
    }else{
        my_info.like = my_info.like.filter(function(it){
            return it !== idx;
        })
        for (var i = 0; i < photos.length; i++) {
            if (photos[i].idx === idx) {
            photos[i].likes--;
            break;
            }
        }
    }
    showPhotos()
}

function toggleFollow(user_id){
    if(my_info.follow.indexOf(user_id) === -1){
        my_info.follow.push(user_id);
    }else{
        my_info.follow = my_info.follow.filter(function(it){
            return it !== user_id;
        })
    }
    showPhotos();
}
function refresh(){
    setTimeout(() => {
        scrollTo(0,0)
    }, 300);
}

function init(){
    showMyinfo();
    showPhotos();
    refresh();
}