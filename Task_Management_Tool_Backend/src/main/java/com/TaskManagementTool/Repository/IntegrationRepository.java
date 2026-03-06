package com.TaskManagementTool.Repository;

import com.TaskManagementTool.Entity.Integration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IntegrationRepository extends JpaRepository<Integration, Long> {

    List<Integration> findByUserId(Long userId);

    Optional<Integration> findByUserIdAndProviderIgnoreCase(Long userId, String provider);
}