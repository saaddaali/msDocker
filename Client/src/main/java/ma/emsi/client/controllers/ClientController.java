package ma.emsi.client.controllers;

import com.netflix.discovery.converters.Auto;
import ma.emsi.client.entities.Client;
import ma.emsi.client.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClientController {
    @Autowired
    ClientRepository clientRepository;

    @GetMapping("/clients")
    public List<Client> findAll(){
        return clientRepository.findAll();
    }

    @GetMapping("/client/{id}")
    public Client findById(@PathVariable Long id) throws Exception  {
        return clientRepository.findById(id)
                .orElseThrow(()-> new Exception("CLient non trouvé"));
    }

    @PostMapping("/clients")
    public ResponseEntity<Client> save(@RequestBody Client client) {
        Client savedClient = clientRepository.save(client);
        return ResponseEntity.ok(savedClient);
    }
}
