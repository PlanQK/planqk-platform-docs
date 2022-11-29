package de.stoneone.planqk.samples.model;

public class ServiceExecutionDto {

    private String id;

    /**
     * Status is either UNKNOWN, PENDING, RUNNING, SUCCEEDED, or FAILED.
     */
    private String status;

    private String createdAt;

    public ServiceExecutionDto() {

    }

    public ServiceExecutionDto(String id, String status, String createdAt) {
        this.id = id;
        this.status = status;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
