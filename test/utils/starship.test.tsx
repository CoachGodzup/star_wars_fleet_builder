import {
  getIconByCrew,
  getColorByCrew,
  CREW_THRESHOLDS,
} from '../../src/utils/starship';
import { render } from '../test-utils/render';

describe('getIconByCrew', () => {
  it('should return IconPlane for crew less than fighter threshold', () => {
    const { container } = render(getIconByCrew(CREW_THRESHOLDS.fighter - 1));

    const icon = container.querySelector('[data-testid="icon-starship"]');

    expect(icon).toBeDefined();
    expect(icon?.getAttribute('data-icon')).toBe('plane');
  });

  it('should return IconRocket for crew less than small threshold', () => {
    const { container } = render(getIconByCrew(CREW_THRESHOLDS.small - 1));

    const icon = container.querySelector('[data-testid="icon-starship"]');

    expect(icon).toBeDefined();
    expect(icon?.getAttribute('data-icon')).toBe('rocket');
  });

  it('should return IconSend for crew less than medium threshold', () => {
    const { container } = render(getIconByCrew(CREW_THRESHOLDS.medium - 1));

    const icon = container.querySelector('[data-testid="icon-starship"]');

    expect(icon).toBeDefined();
    expect(icon?.getAttribute('data-icon')).toBe('ufo');
  });

  it('should return IconSatellite for crew less than large threshold', () => {
    const { container } = render(getIconByCrew(CREW_THRESHOLDS.large - 1));

    const icon = container.querySelector('[data-testid="icon-starship"]');

    expect(icon).toBeDefined();
    expect(icon?.getAttribute('data-icon')).toBe('satellite');
  });

  it('should return IconPlanet for crew greater than or equal to large threshold', () => {
    const { container } = render(getIconByCrew(CREW_THRESHOLDS.large + 1));

    const icon = container.querySelector('[data-testid="icon-starship"]');

    expect(icon).toBeDefined();
    expect(icon?.getAttribute('data-icon')).toBe('planet');
  });
});

describe('getColorByCrew', () => {
  it('should return lime for crew less than fighter threshold', () => {
    expect(getColorByCrew(CREW_THRESHOLDS.fighter - 1)).toBe('lime');
  });

  it('should return cyan for crew less than small threshold', () => {
    expect(getColorByCrew(CREW_THRESHOLDS.small - 1)).toBe('cyan');
  });

  it('should return teal for crew less than medium threshold', () => {
    expect(getColorByCrew(CREW_THRESHOLDS.medium - 1)).toBe('teal');
  });

  it('should return blue for crew less than large threshold', () => {
    expect(getColorByCrew(CREW_THRESHOLDS.large - 1)).toBe('blue');
  });

  it('should return grape for crew greater than or equal to large threshold', () => {
    expect(getColorByCrew(CREW_THRESHOLDS.large)).toBe('grape');
  });
});
