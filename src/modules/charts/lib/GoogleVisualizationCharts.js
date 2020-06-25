import {
  URL_ESTADOS_CIDADES,
  URL_PARALISADAS,
  URL_EXTINTAS,
  URL_ATIVAS,
  URL_MATRICULAS,
  URL_NOVAS,
  URL_ESTADOS_CIDADES_ESCOLAS,
  URL_RESULTADOS_ESCOLAS,
} from './constants';
import { circleJSON, columnJSON } from './circle';

export class GoogleVisualizationCharts {
  google;

  constructor(_google) {
    this.google = _google;
  }

  initializer = async () => {
    await this.google.charts.load('current', {
      packages: ['corechart', 'controls'],
      language: 'pt-BR',
    });
  };

  /* ********************************************************************* */

  getDataComboSituacaoEscolas = async () => {
    if (this.google) {
      const query = 'select A, B LABEL A "ESTADO", B "CIDADE"';
      const dataTable = await this.executeQuery(URL_ESTADOS_CIDADES, query);
      return this.convertDataToComboSituacaoEscolas(dataTable.hg);
    }
    throw new Error("[GoogleVisualizationCharts] Google's not found");
  };

  convertDataToComboSituacaoEscolas = data => {
    const obj = [];
    const states = [];
    for (let index = 0; index < data.length; index += 1) {
      const element = data[index].c;
      const state = element[0].v;
      const city = element[1].v;
      if (states.indexOf(state) === -1) {
        states.push(state);
        obj.push({
          state,
          cities: [],
        });
      }
      obj[obj.length - 1].cities.push(city);
    }
    return obj;
  };

  updateChartsSituacaoEscolas = async (UF, CID, webLayout = false) => {
    const queryCols1 = `select C, D, E, F where A = "${UF}" and B = "${CID}"`;
    const queryCols2 = `select C, D, E, F, G, H, I, J where A = "${UF}" and B = "${CID}"`;
    const [
      dataTableParalisadas,
      dataTableExtintas,
      dataTableAtivas,
      dataTableMatriculas,
      dataTableNovas,
    ] = await Promise.all([
      this.executeQuery(URL_PARALISADAS, queryCols1),
      this.executeQuery(URL_EXTINTAS, queryCols1),
      this.executeQuery(URL_ATIVAS, queryCols1),
      this.executeQuery(URL_MATRICULAS, queryCols2),
      this.executeQuery(URL_NOVAS, queryCols1),
    ]);
    if (dataTableParalisadas.getNumberOfRows() === 0) {
      dataTableParalisadas.addRow([2019, 0, 0, 0]);
    }
    if (dataTableExtintas.getNumberOfRows() === 0) {
      dataTableExtintas.addRow([2019, 0, 0, 0]);
    }
    if (dataTableAtivas.getNumberOfRows() === 0) {
      dataTableAtivas.addRow([2019, 0, 0, 0]);
    }
    if (dataTableMatriculas.getNumberOfRows() === 0) {
      dataTableMatriculas.addRow([2019, 0, 0, 0]);
    }
    if (dataTableNovas.getNumberOfRows() === 0) {
      dataTableNovas.addRow([2019, 0, 0, 0]);
    }
    const dataTableFechadas = this.joinDataTable(
      dataTableParalisadas,
      dataTableExtintas
    );
    const inicioFechadas = this.getYear(dataTableFechadas, 'inicio');
    const fimFechadas = this.getYear(dataTableFechadas, 'fim');
    const inicioAtivas = this.getYear(dataTableAtivas, 'inicio');
    const fimAtivas = this.getYear(dataTableAtivas, 'fim');
    const inicioMatriculas = this.getYear(dataTableMatriculas, 'inicio');
    const fimMatriculas = this.getYear(dataTableMatriculas, 'fim');
    const paralisadas = this.getYearValue(
      dataTableParalisadas,
      this.getYear(dataTableParalisadas, 'fim'),
      3
    );
    const ativas = this.getYearValue(dataTableAtivas, fimAtivas, 3);
    const ativasPassado = this.getYearValue(dataTableAtivas, inicioAtivas, 3);
    const matriculas = this.getYearValue(dataTableMatriculas, fimMatriculas, 1);
    const matriculasPassado = this.getYearValue(
      dataTableMatriculas,
      inicioMatriculas,
      1
    );
    const sumExtintas = this.calculateGrandTotals(
      dataTableExtintas,
      'SumExtintas'
    );
    const fechadas = sumExtintas.getValue(0, 1);
    const sumNovas = this.calculateGrandTotals(dataTableNovas, 'SumNovas');
    const novas = sumNovas.getValue(0, 1);
    const novasEscolas = novas !== 0;
    const desativadas = fechadas + paralisadas;
    const inicio = new Date(`01/01/${inicioFechadas}`);
    const fim = new Date(`12/31/${fimFechadas}`);
    const diffTime = fim.getTime() - inicio.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    const taxaFechadas = (diffDays / desativadas).toFixed(2);
    const taxaNovas = (desativadas / novas).toFixed(2);
    const constiacao = Math.abs(ativas - ativasPassado);
    const maisMenos = ativas > ativasPassado ? 'mais' : 'menos';
    const variacao = Math.abs(ativas - ativasPassado);

    // Calculate maximum limit for vertical axis.
    const maxAti = dataTableAtivas.getColumnRange(3).max;
    const maxFec = dataTableFechadas.getColumnRange(2).max;
    const maxExt = dataTableExtintas.getColumnRange(3).max;
    const maxPar = dataTableParalisadas.getColumnRange(3).max;
    const maxNov = dataTableNovas.getColumnRange(3).max * 1.15;
    const maxMat = dataTableMatriculas.getColumnRange(1).max * 1.15;
    const maxAxis = Math.max(maxAti, maxFec) * 1.15;
    const maxAxis2 = Math.max(maxExt, maxPar) * 1.15;

    // Calculate minimum limit for vertical axis.
    const minAti = dataTableAtivas.getColumnRange(3).min;
    const minFec = dataTableFechadas.getColumnRange(2).min;
    const minExt = dataTableExtintas.getColumnRange(3).min;
    const minPar = dataTableParalisadas.getColumnRange(3).min;
    const minAxis = Math.min(minAti, minFec) - 1;
    const minAxis2 = Math.min(minExt, minPar) - 1;

    this.drawChartsSituacaoEscolas(
      {
        dataTableExtintas,
        dataTableParalisadas,
        dataTableFechadas,
        dataTableNovas,
        dataTableMatriculas,
        dataTableAtivas,
      },
      { maxAxis, minAxis, minAxis2, maxAxis2, maxNov, maxMat },
      webLayout
    );
    return {
      inicioFechadas,
      fimFechadas,
      fechadas,
      paralisadas,
      taxaFechadas,
      desativadas,
      taxaNovas,
      novas,
      fimAtivas,
      ativas,
      inicioAtivas,
      constiacao,
      maisMenos,
      matriculasPassado,
      inicioMatriculas,
      matriculas,
      fimMatriculas,
      maxAxis2,
      minAxis2,
      variacao,
      novasEscolas,
    };
  };

  drawChartsSituacaoEscolas = (dataTables, values, webLayout) => {
    const titleTextStyle = {
      color: '#6f6f6d',
      fontName: 'Arial',
      fontSize: '18',
      bold: true,
    };
    const height = webLayout ? 400 : undefined;
    const backgroundColor = '#FFF';
    const series = [
      { color: '#C9463C' }, // educação infantil
      { color: '#FF8822' }, // anos inicias
      { color: '#FFEECC' }, // anos finais
      { color: '#BCE992' }, // ensino médio
      { color: '#088A61' }, // técnico
      { color: '#1F4B59' }, // eja
    ];
    const seriesPublicaPrivadas = [{ color: '#C9463C' }, { color: '#1F4B59' }];
    const seriesChartParalisadas = [{ color: '#088A61' }, { color: '#FF8822' }];
    const legend = { position: 'top', alignment: 'start' };
    const chartType = 'SteppedAreaChart';
    const pointSize = 2;
    const chartExtintas = new this.google.visualization.ChartWrapper({
      chartType,
      dataTable: dataTables.dataTableExtintas,
      view: { columns: [0, 1, 2, { sourceColumn: 3, role: 'annotation' }] }, // Format last column as annotation.
      containerId: 'chartExtintas_div',
      options: {
        title: 'Quantas escolas fecharam?',
        titleTextStyle,
        curveType: 'function',
        pointSize,
        annotations: { alwaysOutside: true, textStyle: { color: '#000000' } },
        isStacked: true,
        height,
        chartArea: { width: '85%', height: '75%' },
        backgroundColor,
        series: seriesPublicaPrivadas,
        legend,
        hAxis: {
          format: '0',
          viewWindow: { min: 2007, max: 2019 },
        },
        vAxis: {
          format: 'short',
          viewWindow: { min: values.minAxis2, max: values.maxAxis2 },
        },
      },
    });
    const chartParalisadas = new this.google.visualization.ChartWrapper({
      chartType,
      dataTable: dataTables.dataTableParalisadas,
      view: { columns: [0, 1, 2, { sourceColumn: 3, role: 'annotation' }] }, // Format last column as annotation.
      containerId: 'chartParalisadas_div',
      options: {
        title: 'Quantas escolas foram paralisadas?',
        titleTextStyle,
        curveType: 'function',
        pointSize,
        annotations: { alwaysOutside: true, textStyle: { color: '#000000' } },
        isStacked: true,
        height,
        chartArea: { width: '85%', height: '75%' },
        backgroundColor,
        series: seriesPublicaPrivadas,
        legend,
        hAxis: {
          format: '0',
          viewWindow: { min: 2007, max: 2019 },
        },
        vAxis: {
          format: 'short',
          viewWindow: { min: values.minAxis2, max: values.maxAxis2 },
        },
      },
    });
    const chartFechadas = new this.google.visualization.ChartWrapper({
      chartType,
      dataTable: dataTables.dataTableFechadas,
      view: {
        columns: [
          0,
          1,
          2,
          {
            calc: this.sumColumns, // Add calculated annotation.
            type: 'number',
            role: 'annotation',
          },
        ],
      },
      containerId: 'chartFechadas_div',
      options: {
        title: 'Quantas escolas estão desativadas?',
        titleTextStyle,
        curveType: 'function',
        pointSize,
        annotations: { alwaysOutside: true, textStyle: { color: '#000000' } },
        isStacked: true,
        height,
        chartArea: { width: '85%', height: '75%' },
        backgroundColor,
        series: seriesChartParalisadas,
        legend,
        hAxis: {
          format: '0',
          viewWindow: { min: 2007, max: 2019 },
        },
        vAxis: {
          format: 'short',
          viewWindow: { min: values.minAxis, max: values.maxAxis },
        },
      },
    });
    const chartAtivas = new this.google.visualization.ChartWrapper({
      chartType,
      dataTable: dataTables.dataTableAtivas,
      view: { columns: [0, 1, 2, { sourceColumn: 3, role: 'annotation' }] }, // Format last column as annotation.
      containerId: 'chartAtivas_div',
      options: {
        title: 'Quantas escolas estão ativas?',
        titleTextStyle,
        curveType: 'function',
        pointSize,
        annotations: { alwaysOutside: true, textStyle: { color: '#000000' } },
        isStacked: true,
        height,
        chartArea: { width: '85%', height: '75%' },
        backgroundColor,
        series: seriesPublicaPrivadas,
        legend,
        hAxis: {
          format: '0',
          viewWindow: { min: 2007, max: 2019 },
        },
        vAxis: {
          format: 'short',
          viewWindow: { min: values.minAxis, max: values.maxAxis },
        },
      },
    });
    const chartNovas = new this.google.visualization.ChartWrapper({
      chartType,
      dataTable: dataTables.dataTableNovas,
      view: { columns: [0, 1, 2, { sourceColumn: 3, role: 'annotation' }] }, // Format last column as annotation.
      containerId: 'chartNovas_div',
      options: {
        title: 'Quantas escolas abriram?',
        titleTextStyle,
        curveType: 'function',
        pointSize,
        annotations: { alwaysOutside: true, textStyle: { color: '#000000' } },
        isStacked: true,
        height,
        chartArea: { width: '85%', height: '75%' },
        backgroundColor,
        series: seriesPublicaPrivadas,
        legend,
        hAxis: {
          format: '0',
          viewWindow: { min: 2007, max: 2019 },
        },
        vAxis: {
          format: 'short',
          viewWindow: { max: values.maxNov },
        },
      },
    });
    const chartMatriculas = new this.google.visualization.ChartWrapper({
      chartType,
      dataTable: dataTables.dataTableMatriculas,
      view: {
        columns: [
          0,
          2,
          3,
          4,
          5,
          6,
          7,
          {
            calc: this.formatShort, // Add calculated annotation.
            type: 'string',
            role: 'annotation',
          },
        ],
      },
      containerId: 'chartMatriculas_div',
      options: {
        title: 'Quantos alunos se matricularam?',
        titleTextStyle,
        curveType: 'function',
        pointSize,
        annotations: { alwaysOutside: true, textStyle: { color: '#000000' } },
        isStacked: true,
        height,
        chartArea: { left: '10%', width: '85%', height: '65%' },
        backgroundColor,
        series,
        legend: { position: 'top', maxLines: 3 },
        hAxis: {
          format: '0',
          viewWindow: { min: 2007, max: 2019 },
        },
        vAxis: {
          format: 'short',
          viewWindow: { max: values.maxMat },
        },
      },
    });
    chartExtintas.draw();
    chartParalisadas.draw();
    chartFechadas.draw();
    chartAtivas.draw();
    chartNovas.draw();
    chartMatriculas.draw();
  };

  formatShort = (data, row) => {
    const formatter = new this.google.visualization.NumberFormat({
      pattern: 'short',
    });
    return formatter.formatValue(data.getValue(row, 1));
  };

  sumColumns = (dataTable, rowNum) => {
    return dataTable.getValue(rowNum, 1) + dataTable.getValue(rowNum, 2);
  };

  joinDataTable = (t1, t2) => {
    return this.google.visualization.data.join(
      t1,
      t2,
      'full',
      [[0, 0]],
      [3],
      [3]
    );
  };

  getYear = (dataTable, param) => {
    const aggregation = {
      inicio: this.google.visualization.data.min,
      fim: this.google.visualization.data.max,
    };
    const year = this.google.visualization.data.group(
      dataTable,
      [
        {
          column: 0,
          type: 'string',
          modifier: () => {
            return 'Year';
          },
        },
      ],
      [
        {
          column: 0,
          aggregation: aggregation[param],
          type: 'number',
        },
      ]
    );
    return year.getValue(0, 1);
  };

  getYearValue = (dataTable, year, col) => {
    const rows = dataTable.getFilteredRows([{ column: 0, value: year }]);
    return dataTable.getValue(rows[0], col);
  };

  calculateGrandTotals = (dataTable, param) => {
    return this.google.visualization.data.group(
      dataTable,
      [
        {
          column: 0,
          type: 'string',
          modifier: () => {
            return param;
          },
        },
      ],
      [
        {
          column: 3,
          aggregation: this.google.visualization.data.sum,
          type: 'number',
        },
      ]
    );
  };

  /* ********************************************************************* */

  getDataComboResultadosAlunos = async () => {
    if (this.google) {
      const query = 'select A, B, C';
      const dataTable = await this.executeQuery(
        URL_ESTADOS_CIDADES_ESCOLAS,
        query
      );
      return this.convertDataToComboResultadosAlunos(dataTable.hg);
    }
    throw new Error("[GoogleVisualizationCharts] Google's not found");
  };

  convertDataToComboResultadosAlunos = data => {
    const obj = [];
    const states = [];
    for (let index = 1; index < data.length; index += 1) {
      const element = data[index].c;
      const state = element[0].v;
      const city = element[1].v;
      const school = element[2].v;
      if (states.indexOf(state) === -1) {
        states.push(state);
        obj.push({
          state,
          cities: [{ city, schools: [] }],
        });
      }
      const objCity = obj[obj.length - 1].cities.find(c => c.city === city);
      if (objCity) {
        const indexCity = obj[obj.length - 1].cities.indexOf(objCity);
        obj[obj.length - 1].cities[indexCity].schools.push(school);
      } else {
        obj[obj.length - 1].cities.push({ city, schools: [school] });
      }
    }
    return obj;
  };

  updateChartResultadoEscolas = async (estado, cidade, escola, webLayout) => {
    const query = `select A, E, F, G, K, M, N, O, S, T, U, V, W where B = 
    "${estado}" and C = "${cidade}" and D = "${escola}"`;
    const dataTableResultadoEscolas = await this.executeQuery(
      URL_RESULTADOS_ESCOLAS,
      query
    );
    const view = new this.google.visualization.DataView(
      dataTableResultadoEscolas
    );
    this.globalFilter = {
      view,
      dataTableResultadoEscolas,
      radioButtonOptions: this.radioButtonOptions(
        view,
        dataTableResultadoEscolas
      ),
      webLayout,
    };
    return this.setView(view, dataTableResultadoEscolas);
  };

  refreshChartResultadoEscolas = async radioButton => {
    return this.updateView(
      this.globalFilter.view,
      this.globalFilter.dataTableResultadoEscolas,
      this.setFilter(radioButton)
    );
  };

  setFilter = value => {
    switch (value) {
      case 1:
        return 'Ensino Fundamental - Anos Iniciais';
      case 2:
        return 'Ensino Fundamental - Anos Finais';
      case 3:
        return 'Ensino Médio';
      default:
        return 'Ensino Fundamental - Anos Iniciais';
    }
  };

  setView = (view, dataTable) => {
    view.setRows(
      dataTable.getFilteredRows([{ column: 0, value: this.setFilter(1) }])
    );
    if (view.getNumberOfRows() !== 0) {
      return this.refreshChart(view, dataTable);
    }
    view.setRows(
      dataTable.getFilteredRows([{ column: 0, value: this.setFilter(2) }])
    );
    if (view.getNumberOfRows() !== 0) {
      return this.refreshChart(view, dataTable);
    }
    view.setRows(
      dataTable.getFilteredRows([{ column: 0, value: this.setFilter(3) }])
    );
    if (view.getNumberOfRows() !== 0) {
      return this.refreshChart(view, dataTable);
    }
  };

  updateView = (view, dataTable, ano) => {
    view.setRows(dataTable.getFilteredRows([{ column: 0, value: ano }]));
    if (view.getNumberOfRows() === 0) {
      console.log('Número de Linhas Vazio');
      return false;
    }
    return this.refreshChart(view, dataTable);
  };

  radioButtonOptions = (view, dataTable) => {
    const radioOptions = {};
    view.setRows(
      dataTable.getFilteredRows([{ column: 0, value: this.setFilter(1) }])
    );
    radioOptions.anosIniciais = view.getNumberOfRows() !== 0;
    view.setRows(
      dataTable.getFilteredRows([{ column: 0, value: this.setFilter(2) }])
    );
    radioOptions.anosFinais = view.getNumberOfRows() !== 0;
    view.setRows(
      dataTable.getFilteredRows([{ column: 0, value: this.setFilter(3) }])
    );
    radioOptions.ensinoMedio = view.getNumberOfRows() !== 0;
    return radioOptions;
  };

  refreshChart = (view, dataTable) => {
    const alunos = view.getValue(0, 9);
    const aprovados = view.getValue(0, 8);
    const reprovados = view.getValue(0, 7);
    const aprovados3 = view.getValue(0, 11);
    const reprovados3 = view.getValue(0, 12);
    const evadidos = alunos - aprovados - reprovados;
    const jsonAno1 = circleJSON(alunos, aprovados, reprovados);
    const jsonAno2 = columnJSON(alunos, alunos, aprovados, reprovados)[0];
    const jsonAno3 = columnJSON(alunos, evadidos, aprovados3, reprovados3)[0];
    const colorsAno3 = columnJSON(alunos, evadidos, aprovados3, reprovados3)[1];

    // Create data table with all of three years.
    const data = new this.google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Aprovado');
    data.addColumn('number', 'Reprovado');
    data.addColumn('number', 'Evadido');
    data.addColumn('number', 'X');
    data.addColumn('number', 'Aprovado');
    data.addColumn('number', 'Reprovado');
    data.addColumn('number', 'Evadido');
    data.addColumn('number', 'X');
    data.addColumn('number', 'Aprovado');
    data.addColumn('number', 'Reprovado');
    data.addColumn('number', 'Evadido');
    data.addColumn({ type: 'string', role: 'style' });

    // eslint-disable-next-line
    for (const row in jsonAno1) {
      data.addRow([
        jsonAno1[row].x, // First year.
        jsonAno1[row].apr,
        jsonAno1[row].rep,
        jsonAno1[row].eva,
        jsonAno2[row].x, // Second year.
        jsonAno2[row].apr,
        jsonAno2[row].rep,
        jsonAno2[row].eva,
        jsonAno3[row].x, // Third year.
        jsonAno3[row].apr,
        jsonAno3[row].rep,
        jsonAno3[row].eva,
        colorsAno3[row], // Color style.
      ]);
    }

    const chartView = new this.google.visualization.DataView(data);
    chartView.setColumns([0, 1, 2, 3]);

    const chart = new this.google.visualization.ChartWrapper({
      chartType: 'ScatterChart',
      dataTable: chartView,
      containerId: 'chart_div',
      options: {
        width: this.globalFilter.webLayout ? 400 : undefined,
        height: this.globalFilter.webLayout ? 400 : 350,
        chartArea: { width: '100%', height: '80%' },
        backgroundColor: '#fff',
        series: [{ color: 'green' }, { color: 'red' }, { color: 'gray' }],
        legend: { position: 'top', alignment: 'start' },
        hAxis: {
          gridlines: { count: 0 },
          baselineColor: '#fff',
          textPosition: 'none',
          viewWindow: { min: -1, max: 28 },
        },
        vAxis: {
          gridlines: { count: 0 },
          baselineColor: '#fff',
          textPosition: 'none',
          viewWindow: null,
        },
        tooltip: { trigger: 'none' },
        enableInteractivity: false,
        animation: {
          duration: 1000,
          easing: 'linear',
        },
      },
    });

    // Calculate maximum limit for vertical axis.
    const maxApr = data.getColumnRange(5).max;
    const maxRep = data.getColumnRange(6).max;
    const maxEva = data.getColumnRange(7).max;
    const maxAxis = Math.max(maxApr, maxRep, maxEva) + 1;

    this.global = {
      chartView,
      chart,
      maxAxis,
      chartAnimation: 1,
    };

    const sucess = this.setChartView(chartView, chart, maxAxis);
    return sucess ? this.loadDataInfoResultadoAlunos(view, dataTable) : false;
  };

  loadDataInfoResultadoAlunos = (view, dataTable) => {
    const indicadores = {
      localizacao: 1,
      localizacao2: 1,
      rede: 2,
      rede2: 2,
      anoFinal: 3,
      anoFinal2: 3,
      alunos: 9,
      aprovados: 8,
      reprovados: 7,
      evadidos: 4,
      refMediaEvasao: 5,
      evasaoAno3: 10,
    };

    const dataChart = {
      radioButtonOptions: this.globalFilter.radioButtonOptions,
    };
    // eslint-disable-next-line
    for (const id in indicadores) {
      const index = indicadores[id];
      const value = view.getValue(0, index);
      dataChart[id] = value;
    }

    dataChart.anoSeguinte = dataTable.getValue(0, 3) + 1;
    dataChart.anoSeguinte2 = dataTable.getValue(0, 3) + 2;
    dataChart.propMediaEvasao = (view.getValue(0, 6) * 100).toFixed(2);
    dataChart.etapa = view.getValue(0, 0).toLowerCase();

    const total = this.google.visualization.data.group(
      dataTable,
      [
        {
          column: 0,
          modifier: () => {
            return '';
          },
          type: 'string',
        },
      ],
      [
        {
          column: 9, // Same column as for 'alunos'.
          aggregation: this.google.visualization.data.sum,
          type: 'number',
          label: 'Total',
        },
      ]
    );
    dataChart.total = total.getValue(0, 1);

    if (view.getValue(0, 10) != null) {
      dataChart.fraseAno3 = `Dos que voltaram ${view.getValue(
        0,
        11
      )} foram aprovados na nova escola e ${view.getValue(0, 12)}  reprovados.`;
    } else {
      dataChart.fraseAno3 = '';
    }
    return dataChart;
  };

  setAnimationChart = (value = 1) => {
    this.global.chartAnimation = value;
    this.setChartView(
      this.global.chartView,
      this.global.chart,
      this.global.maxAxis,
      this.global.chartAnimation
    );
  };

  nextAnimationChart = () => {
    if (this.global.chartAnimation < 3) {
      this.global.chartAnimation += 1;
      this.setChartView(
        this.global.chartView,
        this.global.chart,
        this.global.maxAxis,
        this.global.chartAnimation
      );
    }
  };

  backAnimationChart = () => {
    if (this.global.chartAnimation > 1) {
      this.global.chartAnimation -= 1;
      this.setChartView(
        this.global.chartView,
        this.global.chart,
        this.global.maxAxis,
        this.global.chartAnimation
      );
    }
  };

  setChartView = (chartView, chart, maxAxis, stage = 1) => {
    const col = stage;
    const cols = {
      1: [0, 1, 2, 3],
      2: [4, 5, 6, 7],
      3: [8, 9, 10, 11, 12], // Additional column for color style.
    };
    const colors = {
      1: [{ color: 'gray' }, { color: 'gray' }, { color: 'gray' }],
      2: [{ color: 'green' }, { color: 'red' }, { color: 'gray' }],
      3: [{ color: 'green' }, { color: 'red' }, { color: 'gray' }],
    };
    const legends = {
      1: null,
      2: { position: 'top', alignment: 'start' },
      3: { position: 'top', alignment: 'start' },
    };
    const hAxis = {
      1: {
        gridlines: { count: 0 },
        baselineColor: '#f5f5f5',
        textPosition: 'none',
        viewWindow: null, // Reset axis.
      },
      2: {
        gridlines: { count: 0 },
        baselineColor: '#f5f5f5',
        textPosition: 'none',
        viewWindow: { min: -1, max: 28 },
      },
      3: {
        gridlines: { count: 0 },
        baselineColor: '#f5f5f5',
        textPosition: 'none',
        viewWindow: { min: -1, max: 28 },
      },
    };
    const vAxis = {
      1: {
        gridlines: { count: 0 },
        baselineColor: '#f5f5f5',
        textPosition: 'none',
        viewWindow: null, // Reset axis.
      },
      2: {
        gridlines: { count: 0 },
        baselineColor: '#f5f5f5',
        textPosition: 'none',
        viewWindow: { max: maxAxis },
      },
      3: {
        gridlines: { count: 0 },
        baselineColor: '#f5f5f5',
        textPosition: 'none',
        viewWindow: { max: maxAxis },
      },
    };
    chartView.setColumns(cols[col]);
    chart.setOption('series', colors[col]);
    chart.setOption('legend', legends[col]);
    chart.setOption('vAxis', hAxis[col]);
    chart.setOption('vAxis', vAxis[col]);
    chart.draw();
    return true;
  };

  /* ********************************************************************* */

  executeQuery = (url, query) => {
    const command = new this.google.visualization.Query(url);
    command.setQuery(query);
    return new Promise((resolve, reject) => {
      command.send(
        response => {
          if (response.isError()) {
            reject(
              new Error(`Error in query: 
              \n${response.getMessage()}
              \n${response.getDetailedMessage()}`)
            );
          }
          resolve(response.getDataTable());
        },
        error => reject(error)
      );
    });
  };
}
