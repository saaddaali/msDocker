package ma.emsi.voiture.services;

import ma.emsi.voiture.entitites.Voiture;
import ma.emsi.voiture.repositories.VoitureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoitureServiceImpl implements VoitureService {
    
    @Autowired
    private VoitureRepository voitureRepository;

    @Override
    public Voiture enregistrerVoiture(Voiture voiture) {
        return voitureRepository.save(voiture);
    }
} 