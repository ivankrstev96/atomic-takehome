package com.ivankrstev.atomictakehome.repository;


import com.ivankrstev.atomictakehome.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {


}
