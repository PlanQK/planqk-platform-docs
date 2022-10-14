package de.stoneone.planqk.samples;

import de.stoneone.planqk.api.invoker.ApiClient;
import de.stoneone.planqk.samples.feign.CustomDecoder;

public class AuthenticationAlternativeSample {

    public static void main(String[] args) {
        ApiClient apiClient = new ApiClient("oauth2");
        apiClient.setOauthPassword("your username", "your password", "vue-frontend", "~");
        apiClient.setFeignBuilder(apiClient.getFeignBuilder().decoder(new CustomDecoder(apiClient.getObjectMapper())));
    }
}
