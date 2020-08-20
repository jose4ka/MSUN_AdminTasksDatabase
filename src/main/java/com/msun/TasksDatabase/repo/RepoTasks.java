package com.msun.TasksDatabase.repo;

import com.msun.TasksDatabase.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoTasks extends JpaRepository<Task, Long> {
}
