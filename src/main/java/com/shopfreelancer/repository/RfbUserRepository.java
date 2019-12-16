package com.shopfreelancer.repository;
import com.shopfreelancer.domain.RfbUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RfbUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RfbUserRepository extends JpaRepository<RfbUser, Long> {

}
