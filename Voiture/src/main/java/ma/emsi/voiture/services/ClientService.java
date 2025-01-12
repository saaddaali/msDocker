package ma.emsi.voiture.services;

import ma.emsi.voiture.entitites.Client;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="SERVICE-CLIENT")
public interface ClientService {
    @GetMapping("/client/{id}")
    public Client clientById(@PathVariable Long id);
}
