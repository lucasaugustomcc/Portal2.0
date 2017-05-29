$(document).ready(function() {
    $(".executionTab").click(function() {
        $('.nav-tabs a[href="#execution"]').tab('show');
        // remove any panels showing on page 
        clearAllPanels();
        getExecutionIDs(getWorkflowURI(), function(res, executionID) {
            renderVisualization(res, true);
            getExecutionMetadata(executionID, function(res) {
                setWorkflowMetadata(res);
            })
        })
        
        var traceSelect = document.getElementById('selection');
        traceSelect.style.display = 'inline';
        /*traceSelect.options[0].setAttribute("selected","selected");*/
        document.getElementById('workflow-name').style.display = "none";
        document.getElementById('execution-name').style.display = "inline-block";
        /*document.getElementById('execution-name').innerHTML = "Selected execution: ";*/
    });
    
    $(".workflowTab").click(function() {
        // remove any panels showing on page 
        clearAllPanels();
        
        $('.nav-tabs a[href="#workflow"]').tab('show');  
        getWorkflowData(workflowURI, function(res) {
            renderVisualization(res, false);
        });
                
        var traceSelect = document.getElementById('selection');
        traceSelect.style.display = 'none';
        
        for (var i = traceSelect.options.length-1; i >= 0; i--) {
            traceSelect.remove(i);
        }
        document.getElementById('execution-name').style.display = "none";
        document.getElementById('workflow-name').style.display = "inline-block";
        document.getElementById('execution-name').innerHTML = "";
    });
});

var setWorkflowMetadata = function(res) {
    if (res.results.hasOwnProperty('bindings')) {
        document.getElementById('status-value').textContent = res.results.bindings[0].status.value;
        //TODO: change time to human readable format
        document.getElementById('label-value').textContent = res.results.bindings[0].label.value;
        document.getElementById('start-time-value').textContent = new Date(res.results.bindings[0].start.value).toString();
        document.getElementById('end-time-value').textContent = new Date(res.results.bindings[0].end.value).toString();
    } else {
        document.getElementById('status-value').textContent = 'N/A';
        document.getElementById('label-value').textContent = 'N/A';
        document.getElementById('start-time-value').textContent = 'N/A';
        document.getElementById('end-time-value').textContent = 'N/A';
    }
}