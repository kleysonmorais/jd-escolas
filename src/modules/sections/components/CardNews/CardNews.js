import React from 'react';
import Item from './Item';

const CardNews = ({ webLayout }) => {
  const items = [
    {
      id: 1,
      img: 'imgs/m1.jpg',
      title: 'O MOTIVO: POR QUE AS ESCOLAS FECHAM NO BRASIL',
      classType: 'section-two',
      link: { pathname: '/publication', query: { page: 1 } },
      text:
        'As razões por trás da redução de unidades de educação básica no país, o flagrante de um colégio que recebe a notícia do encerramento e as cicatrizes para os que ficaram órfãos de parte da própria história. Navegue nos dados e veja o que aconteceu na sua cidade.',
    },
    {
      id: 2,
      img: 'imgs/m2.jpg',
      title: 'Os efeitos: gatilho para a desistência e chance de evoluir',
      classType: 'section',
      link: { pathname: '/publication', query: { page: 2 } },
      text:
        'Levantamento da reportagem revela que a desistência entre alunos de escola recém desativada é maior do que entre indivíduos não afetados pela medida. Veja como foi nas escolas da sua cidade. Por outro lado, municípios que tiveram maiores saltos no Ideb reduziram unidades de ensino fundamental.',
    },
    {
      id: 3,
      img: 'imgs/m3.jpg',
      title: 'As falhas: fechadas para economizar, deram prejuízos',
      classType: 'section-two',
      link: { pathname: '/publication', query: { page: 3 } },
      text:
        'Trapalhadas administrativas na transição dos alunos, burocracia no reaproveitamento de prédios desativados e abandono de estruturas que viraram alvo de vândalos no país. País mantém 40 mil escolas paralisadas.',
    },
    {
      id: 4,
      img: 'imgs/m4.jpg',
      title: 'O vazio no campo: escolas rurais estão mais raras',
      classType: 'section',
      link: { pathname: '/publication', query: { page: 4 } },
      text:
        'Principais unidades afetadas pela redução de unidades no interior do país, percurso de alunos para assistir a aulas é maior, mas muitos afirmam que valeu a pena. Moradores temem incentivo ao êxodo rural.',
    },
    {
      id: 5,
      img: 'imgs/m5.jpg',
      title: 'A oportunidade: Como nasce uma escola',
      classType: 'section-two',
      link: { pathname: '/publication', query: { page: 5 } },
      text:
        'Porque a queda no número de matrículas é a chance para revolucionar o ensino no Brasil, segundo especialistas. A boas práticas que já colhem resultados e inspiram novos modelos no país.',
    },
  ];
  return (
    <>
      {items.map(item => (
        <Item item={item} webLayout={webLayout} key={item.id} />
      ))}
    </>
  );
};

export default CardNews;
