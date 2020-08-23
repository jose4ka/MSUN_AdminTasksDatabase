function getIndex(list, id){
    for (var i = 0; i < list.length; i++){
        if (list[i].id === id){
            return i;
        }
    }

    return -1;
}

//Окно редактирования/создания тасков
Vue.component('task-editor', {
    //Передаём все таски, и атрибуты нужного таска
    props: ['tasks', 'taskAttr'],

    data: function(){
        return{
            text: '',
            id: '',
            dateCreation: '',
            type: '',
            owner: '',
            block: '',
            phoneNumber: ''
        }
    },

    watch: {
            taskAttr: function(newVal, oldVal){
                this.text = newVal.text;
                this.id = newVal.id;
                this.dateCreation = newVal.dateCreation;
                this.type = newVal.type;
                this.owner = newVal.owner;
                this.block = newVal.block;
                this.phoneNumber = newVal.phoneNumber;

            }
    },

    template:
                '<div>'+
                '<input type="text" placeholder="Проблема" v-model="text"/>'+
                '<input type="date" placeholder="Дата создания" v-model="dateCreation"/>'+
                '<input list="variants" placeholder="Тип" v-model="type"/>'+
                   '<datalist id="variants">'+
                    '<option>Интернет</option>'+
                    '<option>Телефон</option>'+
                    '<option>Классы</option>'+
                    '<option>Программы</option>'+
                   '</datalist>'+
                '<input type="text" placeholder="Ф.И.О." v-model="owner"/>'+
                '<input type="text" placeholder="Корпус" v-model="block"/>'+
                '<input type="text" placeholder="Номер телефона" v-model="phoneNumber"/>'+
                '<input type="button" value="Save" @click="save"/>'+
                '</div>',

    methods: {
            save: function(){
                var task = {
                 text: this.text,
                 dateCreation: this.dateCreation,
                 type: this.type,
                 owner: this.owner,
                 block: this.block,
                 phoneNumber: this.phoneNumber
                 };

//Если мы передали определённый таск, то изменяем его
                if(this.id){
                    tasksApi.update({id: this.id}, task).then(result =>
                        result.json().then(data =>{

                            var index = getIndex(this.tasks, data.id);
                            this.tasks.splice(index, 1, data);
                            this.text = ''
                            this.id = ''
                            this.dateCreation = ''
                            this.type = ''
                            this.owner = ''
                            this.block = ''
                            this.phoneNumber = ''
                        })
                    )
                }
                //Иначе - создаём новый
                else{
                   tasksApi.save({}, task).then(result =>
                    result.json().then(data =>{
                        this.tasks.push(data);
                        this.text = ''
                        this.dateCreation = ''
                        this.type = ''
                        this.owner = ''
                        this.block = ''
                        this.phoneNumber = ''
                    })
                )
                }


            }
         }


});


//Наше API для работы с тасками на сервере
var tasksApi = Vue.resource('/tasks{/id}');

//Компонент для отображения тасков в списке
Vue.component('task-row', {

    //Таск, переданный метод для реализации, список самих тасков
    props: ['task', 'editMethod', 'tasks'],

    template:
    '<div>'+
    '<i>(  {{ task.id}}  )</i>'+
    '<span style="position: absolute; left: 0">'+
            '<input type="button" value="Edit" @click="edit" />'+
            '<input type="button" value="X" @click="del" />'+
            '({{task.id}})'+
            '  {{task.text}}  '+
            '  {{task.dateCreation}}  '+
            '  {{task.type}}  '+
            '  {{task.owner}}  '+
            '  {{task.block}}  '+
            '  +{{task.phoneNumber}}  '+
    '</span>'+
    '</div>',

    methods:{
        edit: function(){
            this.editMethod(this.task);
        },

        del: function(){
            this.editMethod(
                tasksApi.remove({id: this.task.id}).then(result => {
                    if(result.ok){
                        this.tasks.splice(this.tasks.indexOf(this.task), 1)
                    }
                })
            )
        }

    }
});


//Компонент со списком тасков
Vue.component('tasks-list', {

    //Полученные из вне таски
    props: ['tasks'],

    //Сразу всё заполняем нулями
    data: function(){
      return{
          task: null,
      }

    },
    template:
    '<div style="position: relative; width: 1000px;">'+
        '<task-editor :tasks="tasks" :taskAttr="task"/>'+
        '<task-row v-for="task in tasks" :key="task.id" :task="task" :editMethod="editMethod" :tasks="tasks"/>'+
    '</div>',

    //После создания - заполняем данными с сервера
    created: function(){
        tasksApi.get().then(result => //Получаем какой-то результат
                result.json().then(data => //Получаем все данные из результата
                    data.forEach(task => this.tasks.push(task)) //Их общей кучи данных достаём по таску, и добавляем в список для дальнейшей работы
                )

        )
    },

    methods: {
    //Срабатывает при нажатии на кнопку "edit" в сообщении
      editMethod: function(task){
          this.task = task;
      }
    }

});


var app = new Vue({
        el: '#app',
        //В качестве основного шаблона выбираем компанент со списком тасков
        //Ему же передаём сам список тасков, для отображения
        template: '<tasks-list :tasks = "tasks"/>',
        data: {
            tasks: []

        }
    });