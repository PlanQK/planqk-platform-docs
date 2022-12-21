package de.stoneone.planqk.samples.alpha;

import de.stoneone.planqk.api.CommunityAlgorithmsApi;
import de.stoneone.planqk.api.invoker.ApiClient;
import de.stoneone.planqk.api.model.AlgorithmDto;
import de.stoneone.planqk.api.model.UpdateAlgorithmRequest;

public class AlgorithmSample {

    public static void main(String[] args) {
        String token = "Your personal access token";
        ApiClient apiClient = new ApiClient("apiKey", token);

        CommunityAlgorithmsApi algorithmApi = apiClient.buildClient(CommunityAlgorithmsApi.class);

        AlgorithmDto payload = new AlgorithmDto()
            .name("My new Algorithm")  // required
            .computationModel(AlgorithmDto.ComputationModelEnum.CLASSIC);  // required
        AlgorithmDto algorithm = algorithmApi.createAlgorithm(payload);

        UpdateAlgorithmRequest updateRequest = new UpdateAlgorithmRequest()
            .name("This is a new Algorithm");
        algorithm = algorithmApi.updateAlgorithm(algorithm.getId(), updateRequest);

        algorithmApi.deleteAlgorithm(algorithm.getId());
    }
}
