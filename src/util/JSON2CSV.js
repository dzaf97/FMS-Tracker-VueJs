export default function objectToCsv(data) {
    const csvRows = [];

    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(",").toUpperCase());
    console.log(csvRows);

    // loop over the rows
    for (const row of data) {
        const values = headers.map(header => {
            const escaped = ("" + row[header]).replace(/"/g, '\\"');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(","));
    };
    return csvRows.join("\n");
};
