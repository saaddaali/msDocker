package ma.emsi.voiture.repositories;

import ma.emsi.voiture.entitites.Voiture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoitureRepository extends JpaRepository<Voiture, Long> {
    List<Voiture> findByIdclient(Long idclient);
}
