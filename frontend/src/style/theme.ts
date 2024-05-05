export type ButtonScheme = 'primary' | 'disabled' | 'transparent' | 'border';
export type ButtonSize = 'large' | 'medium' | 'small';
export type FontSize = 'small' | 'medium' | 'large';
export type FontWeight = 'bold' | 'regular' | 'semiBold';
export type Heading = 'small' | 'medium' | 'large' | 'xLarge';
export type LayoutWidth = 'default' | 'mobileMax' | 'adminMin';
export type ColorKey =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'border'
  | 'disabled'
  | 'darkGray'
  | 'background';

interface Theme {
  // 색상
  color: {
    [key in ColorKey]: string;
  };
  // 제목 크기
  heading: {
    [key in Heading]: { fontSize: string };
  };
  // 본문 크기
  text: {
    [key in FontSize]: { fontSize: string };
  };
  // 텍스트 굵기
  fontWeight: {
    [key in FontWeight]: number;
  };
  // 버튼 크기
  button: {
    [key in ButtonSize]: {
      height: string;
      padding: string;
      fontSize: string;
    };
  };
  // 버튼 테마
  buttonScheme: {
    [key in ButtonScheme]: {
      backgroundColor: string;
      color: string;
      border?: string;
    };
  };
  // 본문 좌우 여백
  padding: { mainContent: string };
  // 모서리 둥근 정도
  borderRadius: { default: string };
  // 레이아웃
  layout: {
    width: {
      [key in LayoutWidth]: string;
    };
  };
}

export const theme: Theme = {
  color: {
    primary: '#59B05F',
    secondary: '#409349',
    danger: '#FF2525',
    border: '#ABA7AF',
    disabled: '#d9d9d9',
    darkGray: '#4F5458',
    background: '#F3F3F3',
  },
  heading: {
    xLarge: { fontSize: '32px' },
    large: { fontSize: '28px' },
    medium: { fontSize: '20px' },
    small: { fontSize: '18px' },
  },
  text: {
    large: { fontSize: '16px' },
    medium: { fontSize: '14px' },
    small: { fontSize: '12px' },
  },
  fontWeight: {
    bold: 700,
    semiBold: 600,
    regular: 400,
  },
  button: {
    large: {
      height: '50px',
      padding: '12px 50px',
      fontSize: '18px',
    },
    medium: {
      height: '40px',
      padding: '8px 28px',
      fontSize: '14px',
    },
    small: {
      height: '30px',
      padding: '4px 12px',
      fontSize: '14px',
    },
  },
  buttonScheme: {
    primary: {
      backgroundColor: '#59B05F',
      color: '#fff',
    },
    border: {
      backgroundColor: '#fff',
      border: '#59B05F',
      color: '#59B05F',
    },
    disabled: {
      backgroundColor: '#d9d9d9',
      color: '#fff',
    },
    transparent: {
      backgroundColor: 'transparent',
      color: '#59B05F',
    },
  },
  padding: {
    mainContent: '0 16px',
  },
  borderRadius: { default: '5px' },

  layout: {
    width: {
      default: '390px',
      mobileMax: '767px',
      adminMin: '768px',
    },
  },
};
