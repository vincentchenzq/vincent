<template>
  <div class="todo-item">
    <div class="todo-menu">
      <span>待办事项</span>
    </div>
    <div class="todo-head">
      <input type="text" class="search" v-model="input" placeholder="接下来做点什么?"  @keyup.enter="addTodo">
      <i class="fa fa-times" v-if="input" @click="clearInput"></i>
    </div>
    <div class="todo-body">
      <ul class="clearfix">
        <li class="left width-half todo-button" :class="[state=='todo'? 'todo-button-active':'']" @click="toggleStatus">待办</li>
        <li class="left width-half todo-button" :class="[state=='done'? 'todo-button-active':'']" @click="toggleStatus">完成</li>
      </ul>
      <div class="todo-content" v-if="state=='todo'">
          <div class="label-out" v-for="(item,index) in todoList" track-by="id">
            <label class="check-label todo-label check-todo" @click="todoClick(item)">
              <input type="checkbox" class="checkbox">
                {{ item.content }}
            </label>
            <div class="to-top" v-if="index!=0" @click="toFirst(item)"></div>
          </div>
      </div>
      <div class="done-content" v-else>
        <div class="label-out" v-for="(item,index) in doneList">
          <label class="check-label todo-label checkdone">
            <input type="checkbox" v-bind:checked="true" class="checkbox" @click="doneClick(item)">
              {{ item.content }}
          </label>
          <div class="todo-delete" @click="deleteTodos(item)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        input:'',
        state:'todo',
        todoList:[],
        doneList:[]
      }
    },
    mounted(){
      this.genTodos();
    },
    computed:{
      todos(){
        return getTodo();
      }
    },
    methods:{
      clearInput(){
        this.input = '';
      },
      toggleStatus(){
        this.state=this.state=='todo' ? 'done' :'todo';
      },
      addTodo(){
        addItem({
          content:this.input,
          status:'todo',
          id:guid()
        });
        this.input = '';
        this.genTodos();
      },
      //完成一个任务
      todoClick(todo){
        let todos = getTodo();
        todos[getIndexById(todo.id)].status='done';
        setTodo(todos);
        this.genTodos();
      },
      // 将一个任务变成未完成
      doneClick(todo){
        let todos = getTodo();
        todos[getIndexById(todo.id)].status='todo';
        setTodo(todos);
        this.genTodos();
      },
      //置顶功能
      toFirst(todo){
        let todos = getTodo();
        setTodo(todos.splice(getIndexById(todo.id),1).concat(todos));
        this.genTodos();
      },
      //删除一条已经完成的任务
      deleteTodos(todo){
        let todos = getTodo();
        todos.splice(getIndexById(todo.id),1);
        setTodo(todos);
        this.genTodos();
      },
      genTodos(){
        this.todoList = [];
        this.doneList = [];
        getTodo().forEach((item) =>{
          if(item.status=='todo'){
            this.todoList.push(item)
          }else{
            this.doneList.push(item);
          }
        });
      }
    }
  }

  function addItem(item){
    let todo = getTodo();
    todo.push(item);
    setTodo(todo);
  }

  function getIndexById(id){
    let index;
    getTodo().forEach(function(todo,idx){
      if(todo.id===id){
        index = idx
      }
    });
    return index;
  }

  function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  function getTodo(){
    if(!localStorage['todoItem']){
      return [];
    }
    return JSON.parse(localStorage['todoItem']);
  }
  function setTodo(todo){
    localStorage['todoItem'] = JSON.stringify(todo);
  }


</script>

<style>
  .todo-item{
    box-shadow:0 0 12px grey;
  }
  .todo-menu{
    height:50px;
    background: #2ECC71;
  }
  .todo-menu>span{
    color:#fff;
    font-size: 22px;
    cursor: pointer;
    line-height: 50px;
    float:left;
    margin-left: 30px;
  }

  .todo-body{
    background: #fdfdf5;
    min-height:400px;
  }
  .todo-head{
    padding:20px;
    position: relative;
    box-sizing: border-box;
    background: #fdfdf5;
  }
  .search{
    padding: 0 10px;
    line-height: 32px;
    color: #555;
    font-size: 14px;
    margin: 0;
    outline: 0;
    display: block;
    height:40px;
    width:99%;
    border-radius: 35px;
    border: 1px solid #ECF0F1;
  }
  .search:focus{
    border: 1px solid #2ECC71
  }
  .todo-head>i{
    position: absolute;
    top: 27px;
    right: 27px;
  }
  .width-half{
    width:50%;
  }

  .todo-button{
    cursor: pointer;
  }
  .todo-button-active{
    color:#2ECC71;
  }
  .label-out{
    position: relative;
    margin-top: 4px;
    margin-bottom: 16px;
    outline: transparent solid 1px;
    min-height: 28px;
  }
  .check-todo{
    text-decoration: none;
  }
  .todo-label {
    -webkit-transform: translate(5px);
    min-height: 28px;
  }
  .check-label {
    position: relative;
    margin: 5px 50px 15px;
    height: auto;
  }
  .check-label, .check-label-N {
    display: block;
    text-align: left;
    padding-left: 30px;
    padding-right: 20px;
    word-wrap: break-word;
    font-size: 16px;
    color: #2ECC71;
    line-height: 1.8;
    cursor: pointer;
  }
  .to-top{
    padding-left: 3px;
    padding-right: 3px;
    background-image: url('../assets/toTop.png');
  }
  .to-top, .todo-delete {
    transition: all .2s ease;
    width: 18px;
    height: 18px;
    position: absolute;
    top: 4px;
    right: 60px;
    background-size: 100%;
    cursor: pointer;
    display: none;
  }
  .checkbox {
    -webkit-transition: border .2s ease;
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid #2ECC71;
    cursor: pointer;
    background-position: 0 -19px;
    margin: 0;
  }
  .checkbox, .checkboxN {
    -webkit-appearance: none;
    top: 4px;
    outline: 0;
    background-image: url('../assets/check.png');
    background-size: 100%;
    left: 0;
  }
  .todo-content .label-out:hover .checkbox{
    background-position: 0 22px;
  }
  .todo-content .label-out:hover .to-top{
    display: block;
  }
  .checkdone {
    color: #ccc;
    text-decoration: line-through;
  }
  .checkbox:checked {
    border-color: #ccc;
    background-position: 0 -5px;
  }
  .todo-delete {
    background-image: url('../assets/delete.png');
    -webkit-transform: scale(1.1);
  }
  .done-content .label-out:hover .checkbox{
    background-position: 0 8px;
  }
  .done-content .label-out:hover .todo-delete{
    display: block;
  }
</style>
