function main(){
    ssimple_chart_config = {
        chart: {
            container: "#tree-simple"
        },
        nodeStructure: {
            text: { name: "Parent node" },
            children: [
                {
                    text: { name: "First child" }
                },
                {
                    text: { name: "Second child" }
                }
            ]
        }
    };
    new Treant( ssimple_chart_config );
}
