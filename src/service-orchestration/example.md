# A workflow example

In this chapter, the set up of a workflow is described along a concrete example.

The example consist of 2 service calls whereas the second service processes the result of teh first service call.

## The Services

For this example 2 services will be combined in a workflow:
- stock time series service
- covariance generator

Both services have to be available, published and subscribed by an algorithm. 

### Stock time series service

This service downloads the values of a given stock for a given time window.

It takes as input data:

| Input Value | Description                                                                                     |
|-------------|-------------------------------------------------------------------------------------------------|
| stock_symbols | Array of stock names, e.g. `["IBM","AAPL"]`                                                     |
| start_date | The day of the first stock value to be retreived. Must be in form yyyy-mm-dd, e.g. `2022-01-01` |
| end_date | The day of the last stock value to be retreived. Must be in form yyyy-mm-dd, e.g. `2022-02-02`  |

It takes as input params:

- no params

It returns as output:

- A Json structure containing for each stock an array of date-value pairs.

### Covariance generator

This service computes the covariance within an array of values.

It takes as input data:

| Input Value | Description                                                |
|-------------|------------------------------------------------------------|
| time_series_data | A map of objects which contains a map of time/value pairs. |

It takes as input params:

| Input Value | Description                                                 |
|-------------|-------------------------------------------------------------|
| covariance_estimator | name of algorithm to be taken for computation of covariance |
| number_of_decimals | number of ... |

It returns as output:

- A Json structure containing the shrunk covariance matrix.

## The workflow without explicit data flow

Create a new workflow service. Go to the details page and open the workflow model editor.

Create the following flow:

<img width="768" :src="$withBase('/images/workflow/workflow-example-v1.png')" alt="">

- drag 2 service nodes into the editor
- assign the 2 services to the nodes
- connect the nodes (start node -> service node -> service node -> end node)

Now we need to configure the input/output data of the 2 service calls.

Input/output data configuration of stock time series service call:

- Click on the stock series service. On the right side of the editor you find the context menu for this node.

Configure the input params:
- Click on the plus-button of the inputs param. Enter `stock_symbols` as name and `${wf_stock_symbols}` as value.
  With this configuration you can later pass the stock symbol array as parameter `wf_stock_symbols` to the workflow.
- Click again on the plus-button of the inputs param. Enter `start_date` as name and `${wf_start_date}` as value.
  With this configuration you can later pass the start date for the time series as parameter `wf_start_date` to the workflow.
- Click again on the plus-button of the inputs param. Enter `end_date` as name and `${wf_end_date}` as value.
  With this configuration you can later pass the end date for the time series as parameter `wf_end_date` to the workflow.

Configure the output params:
- Click on the plus-button of the outputs param. Enter `time_series_interim` as name and `${result.jsonPath("$.content").element()}` as value.
  With this configuration the result of the stock series service call is written into a workflow environment parameter with name `time_series_interim` which then can be accessed by the second service.

Input/output data configuration of covariance service call:

- Click on the covariance service. On the right side of the editor you find the context menu for this node.

Configure the input params:
- Click on the plus-button of the inputs param. Enter `time_series` as name and `${time_series_interim}` as value.
  With this configuration the interim result of the stock series service call is taken as input for the parameter `time_series`.
- Click again on the plus-button of the inputs param. Enter `params` as name and `"{\"covariance_estimator\": \"LedoitWolf\", \"number_of_decimals\": 4}"` as value.
  With this configuration the parameter for the covariance service call are hard coded within the workflow and doesn't need to be specified at call time.

