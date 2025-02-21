import React from 'react';

import { getIconByCrew, getColorByCrew } from '../../src/utils/starship';
import { render } from '../test-utils/render';

describe('getIconByCrew', () => {
  it('should return IconPlane for crew less than fighter threshold', () => {
    const { container } = render(getIconByCrew(1));

    const icon = container.querySelector('[data-testid="icon-starship"]');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('data-icon', 'plane');
  });

  it('should return IconRocket for crew less than small threshold', () => {
    const { container } = renderWithMantineProvider(getIconByCrew(5));
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveAttribute(
      'data-icon',
      'rocket',
    );
  });

  it('should return IconSend for crew less than medium threshold', () => {
    const { container } = renderWithMantineProvider(getIconByCrew(100));
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveAttribute('data-icon', 'send');
  });

  it('should return IconSatellite for crew less than large threshold', () => {
    const { container } = renderWithMantineProvider(getIconByCrew(1000));
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveAttribute(
      'data-icon',
      'satellite',
    );
  });

  it('should return IconPlanet for crew greater than or equal to large threshold', () => {
    const { container } = renderWithMantineProvider(getIconByCrew(20000));
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveAttribute(
      'data-icon',
      'planet',
    );
  });
});

describe('getColorByCrew', () => {
  it('should return lime for crew less than fighter threshold', () => {
    expect(getColorByCrew(1)).toBe('lime');
  });

  it('should return cyan for crew less than small threshold', () => {
    expect(getColorByCrew(5)).toBe('cyan');
  });

  it('should return teal for crew less than medium threshold', () => {
    expect(getColorByCrew(100)).toBe('teal');
  });

  it('should return blue for crew less than large threshold', () => {
    expect(getColorByCrew(1000)).toBe('blue');
  });

  it('should return grape for crew greater than or equal to large threshold', () => {
    expect(getColorByCrew(20000)).toBe('grape');
  });
});
