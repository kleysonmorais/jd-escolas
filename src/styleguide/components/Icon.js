import React from 'react';
import PropTypes from 'prop-types';
import { compose, branch, lifecycle, renderComponent } from 'recompose';
import { MdCropSquare } from 'react-icons/md';
import { test, keys } from 'ramda';

import Twitter from 'app/styleguide/icons/Twitter';
import Whatsapp from 'app/styleguide/icons/Whatsapp';
import Facebook from 'app/styleguide/icons/Facebook';
import Instagram from 'app/styleguide/icons/Instagram';
import Close from 'app/styleguide/icons/Close';
import CaretRight from 'app/styleguide/icons/CaretRight';
import Trending from 'app/styleguide/icons/Trending';
import Time from 'app/styleguide/icons/Time';
import Person from 'app/styleguide/icons/Person';
import Video from 'app/styleguide/icons/Video';
import Soccer from 'app/styleguide/icons/Soccer';
import Entertainment from 'app/styleguide/icons/Entertainment';
import Fun from 'app/styleguide/icons/Fun';
import Edit from 'app/styleguide/icons/Edit';
import Pencil from 'app/styleguide/icons/Pencil';
import Move from 'app/styleguide/icons/Move';
import Filter from 'app/styleguide/icons/Filter';
import Add from 'app/styleguide/icons/Add';
import AddNews from 'app/styleguide/icons/AddNews';
import Draft from 'app/styleguide/icons/Draft';
import Find from 'app/styleguide/icons/Find';
import Sort from 'app/styleguide/icons/Sort';
import Play from 'app/styleguide/icons/Play';
import Pause from 'app/styleguide/icons/Pause';
import CaretDown from 'app/styleguide/icons/CaretDown';

export const icons = {
  twitter: Twitter,
  whatsapp: Whatsapp,
  facebook: Facebook,
  instagram: Instagram,
  close: Close,
  caretRight: CaretRight,
  caretDown: CaretDown,
  trending: Trending,
  time: Time,
  move: Move,
  sort: Sort,
  edit: Edit,
  add: Add,
  find: Find,
  addNews: AddNews,
  draft: Draft,
  filter: Filter,
  person: Person,
  video: Video,
  audio: Video,
  play: Play,
  pause: Pause,
  soccer: Soccer,
  entertainment: Entertainment,
  fun: Fun,
  pencil: Pencil,
};

const Icon = ({ name, href, ...props }) =>
  React.createElement(icons[name], props);

Icon.propTypes = {
  // eslint-disable-next-line react/require-default-props
  name: PropTypes.oneOf(Object.keys(icons)),
  // eslint-disable-next-line react/require-default-props
  href: PropTypes.string,
};

// eslint-disable-next-line camelcase
function UNSAFE_componentWillMount() {
  console.error(`Ícone "${this.props.name}" não encontrado.`, this.props);
}

const showUnknownFoundIcon = compose(
  lifecycle({ UNSAFE_componentWillMount }),
  // withProp('title', () => 'Ícone não encontrado'),
  renderComponent(MdCropSquare)
);

const iconNotFound = ({ name }) => !icons[name];

export default branch(iconNotFound, showUnknownFoundIcon)(Icon);

// @TODO: Move these helper functions to better place.
const regExpIconType = url => icon => test(new RegExp(icon, 'i'), url);

// Helpers function to get icon type by Url using regular expression test.
export const getIconTypeByUrl = url => keys(icons).find(regExpIconType(url));
