package ma.emsi.servicegateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.ReactiveDiscoveryClient;
import org.springframework.cloud.gateway.discovery.DiscoveryClientRouteDefinitionLocator;
import org.springframework.cloud.gateway.discovery.DiscoveryLocatorProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.web.client.RestClient;

@SpringBootApplication
public class ServiceGatewayApplication {

	public static void main(String[] args) {
			SpringApplication.run(ServiceGatewayApplication.class, args);
	}

	@Bean
	RestClient.Builder restClientBuilder() {
		return RestClient.builder();
	}

	@Bean
	DiscoveryClientRouteDefinitionLocator routesDynamique(ReactiveDiscoveryClient rdc, DiscoveryLocatorProperties dlp){
		return new DiscoveryClientRouteDefinitionLocator(rdc,dlp);
	}


	@Bean
	RouteLocator routes(RouteLocatorBuilder builder){
		return builder.routes()
				.route(r->r.path("/clients/**").uri("lb://SERVICE-CLIENT"))
				.route(r->r.path("/voitures/**").uri("lb://SERVICE-VOITURE"))
				.build();
	}
}
