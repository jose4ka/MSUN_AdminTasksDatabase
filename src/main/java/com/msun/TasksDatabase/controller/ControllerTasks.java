package com.msun.TasksDatabase.controller;

import com.msun.TasksDatabase.model.Task;
import com.msun.TasksDatabase.repo.RepoTasks;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("tasks")
public class ControllerTasks {


    private final RepoTasks repoTasks;

    @Autowired
    public ControllerTasks(RepoTasks repoTasks){
        this.repoTasks = repoTasks;
    }



    @GetMapping
    private List<Task> getAllTasks(){
        return repoTasks.findAll();
    }

    @GetMapping("{id}")
    private Task getOneTask(@PathVariable("id") Task task){
        return task;
    }

    @PostMapping
    public Task create(@RequestBody Task task){
        return repoTasks.save(task);
    }

    @PutMapping("{id}")
    public Task update(
            @PathVariable("id") Task taskFromDB,
            @RequestBody Task task
    ){
        BeanUtils.copyProperties(task, taskFromDB, "id");
        return repoTasks.save(taskFromDB);
    }


    @DeleteMapping("{id}")
    public void delete(@PathVariable("id")Task task){
        repoTasks.delete(task);
    }


}
