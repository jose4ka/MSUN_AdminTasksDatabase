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
            id: '',
            dateCreation: '',
            timeCreation: '',
            owner: '',
            subdivision: '',
            block: '',
            cabinet: '',
            type: '',
            phoneNumber: '',
            text: '',
            performanceStatus: '',
            datePerformance: '',
            executors: '',
            comment: ''

        }
    },

    watch: {
            taskAttr: function(newVal, oldVal){
                this.id = newVal.id;
                this.dateCreation = newVal.dateCreation;
                this.timeCreation = newVal.timeCreation;
                this.owner = newVal.owner;
                this.subdivision = newVal.subdivision;
                this.block = newVal.block;
                this.cabinet = newVal.cabinet;
                this.type = newVal.type;
                this.phoneNumber = newVal.phoneNumber;
                this.text = newVal.text;
                this.performanceStatus = newVal.performanceStatus;
                this.datePerformance = newVal.datePerformance;
                this.executors = newVal.executors;
                this.comment = newVal.comment;

            }
    },

    template:
                '<div>'+
                '<input type="date" placeholder="Дата создания" v-model="dateCreation"/>'+
                '<input type="time" placeholder="Время создания" v-model="timeCreation"/>'+
                '<input type="text" placeholder="Ф.И.О. заявителя" v-model="owner"/>'+
                '<input type="text" placeholder="Подразделение" v-model="subdivision" value="СКТУ и ВЭО"/>'+

                '<input list="blocks" placeholder="Корпус" v-model="block"/>'+
                                    '<datalist id="blocks">'+
                                      '<option>Корпус №1 (Верхнепортовая 50а)</option>'+
                                      '<option>Корпус №2 (Верхнепортовая 50б</option>'+
                                      '<option>Корпус №3 (Станюковича 60а)</option>'+
                                      '<option>Корпус №5 (Станюковича 58)</option>'+
                                      '<option>Корпус №6 (Станюковича 66)</option>'+
                                      '<option>Корпус №7 (Станюковича 64)</option>'+
                                      '<option>Корпус №8 (Авраменко 16)</option>'+
                                      '<option>Корпус №9 (Станюковича 62)</option>'+
                                      '<option>Корпус №10 (Станюковича 62)</option>'+
                                      '<option>Корпус №12 (Авраменко 9)</option>'+
                                      '<option>Корпус №14 (Тренажерный комплекс)</option>'+
                                      '<option>Водная станция (Лейтентанта Шмидта 29)</option>'+
                                    '</datalist>'+

                '<input type="text" placeholder="Кабинет" v-model="cabinet"/>'+

                '<input list="types" placeholder="Категория" v-model="type"/>'+
                                   '<datalist id="types">'+
                                    '<option>Телефония</option>'+
                                    '<option>Сеть</option>'+
                                    '<option>Классы</option>'+
                                    '<option>Программы</option>'+
                                   '</datalist>'+

                '<input type="text" placeholder="Телефон для связи" v-model="phoneNumber"/>'+
                '<input type="text" placeholder="Описания проблемы" v-model="text"/>'+

                '<input list="perfStatuses" placeholder="Статус выполнения" v-model="performanceStatus"/>'+
                                                   '<datalist id="perfStatuses">'+
                                                    '<option>Принята</option>'+
                                                    '<option>Выполнена</option>'+
                                                    '<option>Ожидание</option>'+
                                                    '<option>Невыполнима</option>'+
                                                   '</datalist>'+

                '<input type="date" placeholder="Дата выполнения" v-model="datePerformance"/>'+
                '<input type="text" placeholder="Исполнители" v-model="executors"/>'+
                '<input type="text" placeholder="Комментарий" v-model="comment"/>'+

                '<input type="button" value="Save" @click="save"/>'+
                '<input type="button" value="Reset" @click="reset"/>'+
                '</div>',

    methods: {
            save: function(){
                var task = {
                 dateCreation: this.dateCreation,
                 timeCreation: this.timeCreation,
                 owner: this.owner,
                 subdivision: this.subdivision,
                 block: this.block,
                 cabinet: this.cabinet,
                 type: this.type,
                 phoneNumber: this.phoneNumber,
                 text: this.text,
                 performanceStatus: this.performanceStatus,
                 datePerformance: this.datePerformance,
                 executors: this.executors,
                 comment: this.comment

                 };

//Если мы передали определённый таск, то изменяем его
                if(this.id){
                    tasksApi.update({id: this.id}, task).then(result =>
                        result.json().then(data =>{

                            var index = getIndex(this.tasks, data.id);
                            this.tasks.splice(index, 1, data);

                            this.id = ''
                            this.dateCreation = ''
                            this.timeCreation = ''
                            this.owner = ''
                            this.subdivision = ''
                            this.block = ''
                            this.cabinet = ''
                            this.type = ''
                            this.phoneNumber = ''
                            this.text = ''
                            this.performanceStatus = ''
                            this.datePerformance = ''
                            this.executors = ''
                            this.comment = ''
                        })
                    )
                }
                //Иначе - создаём новый
                else{
                   tasksApi.save({}, task).then(result =>
                    result.json().then(data =>{
                        this.tasks.push(data);

                        this.dateCreation = ''
                        this.timeCreation = ''
                        this.owner = ''
                        this.subdivision = ''
                        this.block = ''
                        this.cabinet = ''
                        this.type = ''
                        this.phoneNumber = ''
                        this.text = ''
                        this.performanceStatus = ''
                        this.datePerformance = ''
                        this.executors = ''
                        this.comment = ''
                    })
                )
                }


            },

            reset: function(){

            this.id = ''
            this.dateCreation = ''
            this.timeCreation = ''
            this.owner = ''
            this.subdivision = ''
            this.block = ''
            this.cabinet = ''
            this.type = ''
            this.phoneNumber = ''
            this.text = ''
            this.performanceStatus = ''
            this.datePerformance = ''
            this.executors = ''
            this.comment = ''

            }
         },



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

            '<input type="button" value="X" @click="del" />'+
            '<input type="button" value="Edit" @click="edit" />'+

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