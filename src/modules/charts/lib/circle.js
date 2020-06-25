/**
 * Returns object to plot scatter chart with circle.
 * @param {number} alunos     Total size.
 * @param {number} aprovados  Approved size.
 * @param {number} reprovados Reproved size.
 */
export function circleJSON(alunos, aprovados, reprovados) {
  var gap = 1.5; // Spacing rate between circles.
  var steps = [0]; // Add center dot.

  // Define number of students for each inner circle.
  var i = 1;
  while (steps.length <= alunos - 1) {
    steps = steps.concat(Array(6 * i).fill(6 * i));
    i++;
  }

  steps.splice(alunos); // Crop list.

  // Evenly distribute.
  var radius = [];
  var angle = [];
  for (var step in steps) {
    radius = radius.concat((gap * steps[step]) / 6);
    angle = angle.concat(steps[step] == 0 ? 0 : (2 * Math.PI) / steps[step]);
  }

  // Create data frame.
  var df = {
    steps: steps,
    radius: radius,
    angle: angle,
    theta: [],
    series: [],
    x: [],
    y: [],
  };

  // Calculate cumulative sum for theta (make it spin).
  var cumSum = df['angle'];

  for (var row = 1; row < df['angle'].length; row++) {
    if (df['steps'][row] == df['steps'][row - 1]) {
      cumSum[row] = cumSum[row - 1] + cumSum[row];
    }
  }

  df['theta'] = cumSum;

  df['x'] = df['theta'].map(function(x) {
    return Math.cos(x);
  });
  df['y'] = df['theta'].map(function(y) {
    return Math.sin(y);
  });

  for (row in df['x']) {
    df['x'][row] = df['x'][row] * df['radius'][row] + 14;
    df['y'][row] = df['y'][row] * df['radius'][row] + 14;
  }

  /**
   * Returns corresponding chart series.
   * @param {number} index      Student count.
   * @param {number} aprovados  Approved size.
   * @param {number} reprovados Reproved size.
   */
  function define_series(index, aprovados, reprovados) {
    if (index < aprovados) {
      return 'apr';
    } else if (index < aprovados + reprovados) {
      return 'rep';
    } else {
      return 'eva';
    }
  }

  df['series'] = Array.apply(null, { length: df['x'].length }).map(
    Function.call,
    Number
  ); // Creates array with ascending index.

  df['series'] = df['series'].map(function(index) {
    return define_series(index, aprovados, reprovados);
  });

  var result = [];

  for (var i = 0; i < df['x'].length; i++) {
    result = result.concat({
      x: df['x'][i],
      apr: df['series'][i] == 'apr' ? df['y'][i] : null,
      rep: df['series'][i] == 'rep' ? df['y'][i] : null,
      eva: df['series'][i] == 'eva' ? df['y'][i] : null,
    });
  }
  return result;
}

/**
 * Returns object to plot scatter chart with columns.
 * @param {number} total      Total size.
 * @param {number} alunos     Total of students from sample (2nd or 3rd year).
 * @param {number} aprovados  Approved size.
 * @param {number} reprovados Reproved size.
 */
export function columnJSON(total, alunos, aprovados, reprovados) {
  var evadidos = alunos - aprovados - reprovados;
  var columns = 8; // Number of columns on chart for each series.
  var spacing = 5; // Spacing between series.

  /**
   * Define students coordinates for each series.
   * @param {number} n Series size.
   */
  function get_coords(n) {
    var x_array = Array.apply(null, { length: columns }).map(
      Function.call,
      Number
    );
    var y_array = Array(columns).fill(0);

    var x = Array.apply(null, { length: columns }).map(Function.call, Number);
    var y = 1; // Start from second dot.
    for (var i = 0; i <= n; i += columns) {
      x_array = x_array.concat(x);
      y_array = y_array.concat(Array(columns).fill(y));
      y++;
    }

    // Crop list.
    y_array.splice(n);
    x_array.splice(n);

    return { x: x_array, y: y_array };
  }

  /**
   * Returns data frame for each series.
   * @param {number} n Series size.
   */
  function create_df(n) {
    var coords = get_coords(n);
    var x = coords['x'];
    var y = coords['y'];
    return { x: x, y: y };
  }

  var df_apr = create_df(aprovados);
  var df_rep = create_df(reprovados);
  var df_eva = create_df(evadidos);

  // Add spacing between columns.
  for (var i = 0; i < df_rep['x'].length; i++) {
    df_rep['x'][i] += spacing * 2;
  }
  for (var i = 0; i < df_eva['x'].length; i++) {
    df_eva['x'][i] += spacing * 4;
  }

  // Append data frames.
  var df_x = [];
  df_x = df_x.concat(df_apr['x']);
  df_x = df_x.concat(df_rep['x']);
  df_x = df_x.concat(df_eva['x']);

  var df_y = [];
  df_y = df_y.concat(df_apr['y']);
  df_y = df_y.concat(df_rep['y']);
  df_y = df_y.concat(df_eva['y']);

  // Merge series.
  var result = [];
  var colors = [];

  var colorsAno3 = [];
  var colApr = [];
  var colRep = [];
  var colEva = [];

  colorsAno3 = colorsAno3.concat(
    Array(df_apr['y'].length).fill('color: green;')
  );
  colorsAno3 = colorsAno3.concat(Array(df_rep['y'].length).fill('color: red;'));
  colorsAno3 = colorsAno3.concat(
    Array(df_eva['y'].length).fill('color: gray;')
  );

  colApr = colApr.concat(df_apr['y']);
  colApr = colApr.concat(Array(df_rep['y'].length).fill(null));
  colApr = colApr.concat(Array(df_eva['y'].length).fill(null));

  colRep = colRep.concat(Array(df_apr['y'].length).fill(null));
  colRep = colRep.concat(df_rep['y']);
  colRep = colRep.concat(Array(df_eva['y'].length).fill(null));

  colEva = colEva.concat(Array(df_apr['y'].length).fill(null));
  colEva = colEva.concat(Array(df_rep['y'].length).fill(null));
  colEva = colEva.concat(df_eva['y']);

  if (total > alunos) {
    for (var i = 0; i < total - alunos; i++) {
      result = result.concat({
        x: null,
        apr: null,
        rep: null,
        eva: null,
      });
      colors = colors.concat(['color: null;']);
    }
    for (i = 0; i < df_x.length; i++) {
      result = result.concat({
        x: df_x[i],
        apr: null,
        rep: null,
        eva: df_y[i],
      });
      colors = colors.concat(colorsAno3[i]);
    }
  } else {
    for (i = 0; i < df_x.length; i++) {
      result = result.concat({
        x: df_x[i],
        apr: colApr[i],
        rep: colRep[i],
        eva: colEva[i],
      });
    }
  }

  return [result, colors];
}
