import React, { FC } from 'react';
import './PokeBallCapture.css';

const PokeBallCapture: FC<{ ballShake: number }> = ({ ballShake }) => {
    const shakeClass = ballShake === 4 ? 'tilt-capture' : 'tilt-' + ballShake;
    return (
        <div className="poke-ball-capture" data-testid="PokeBallCapture">
            <svg width="120" height="127" viewBox="0 0 120 127" fill="none" xmlns="http://www.w3.org/2000/svg" className={shakeClass}>
                <ellipse cx="60.5" cy="64.5" rx="57.5" ry="58.5" fill="#080B12" />
                <g filter="url(#filter0_i_1669_162202)">
                    <mask id="mask0_1669_162202" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="72" width="120" height="55">
                        <path d="M0 72.5061C0 72.5061 20.382 80.5522 59.7753 80.3922C99.1685 80.2322 120 72.5061 120 72.5061V127H0V72.5061Z" fill="#08070D" />
                    </mask>
                    <g mask="url(#mask0_1669_162202)">
                        <ellipse cx="60" cy="63.9114" rx="60" ry="61.0313" fill="#EFEFEF" />
                    </g>
                </g>
                <g filter="url(#filter1_i_1669_162202)">
                    <mask id="mask1_1669_162202" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="74">
                        <path d="M0 64.6698C0 64.6698 16.5393 73.2832 59.955 73.2832C103.371 73.2832 120 64.6698 120 64.6698V-9.38204e-05H0V64.6698Z" fill="#08070D" />
                    </mask>
                    <g mask="url(#mask1_1669_162202)">
                        <ellipse cx="60.0446" cy="63.9114" rx="59.4157" ry="61.0313" fill="#E23036" />
                    </g>
                </g>
                <mask id="mask2_1669_162202" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="35" y="77" width="50" height="24">
                    <rect x="35.8193" y="77.1233" width="49.0787" height="23.3611" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask2_1669_162202)">
                    <ellipse cx="59.9549" cy="77.329" rx="21.573" ry="20.5495" fill="#216A78" />
                </g>
                <ellipse cx="59.9771" cy="76.4606" rx="21.0112" ry="20.5495" fill="#08070D" />
                <path d="M2 65C2 65 19.8409 72.4028 59.8869 72.4028C99.9329 72.4028 118 65 118 65V72.4028C118 72.4028 100.091 79 59.8869 79C19.6827 79 2 72.4028 2 72.4028V65Z" fill="#08070D" />
                <path d="M0.628906 71.7749V71.7749C1.073 71.519 1.56758 71.363 2.07817 71.3178L2.33677 71.2949V72.5064H0.628906V71.7749Z" fill="#216A78" />
                <path d="M119.371 71.7611V71.7611C118.915 71.5002 118.408 71.3413 117.885 71.2954L117.618 71.272V72.5063H119.371V71.7611Z" fill="#216A78" />
                <mask id="mask3_1669_162202" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="71" width="120" height="17">
                    <path d="M0.539062 71.6377C15.549 74.3843 38.5615 78.9066 38.5615 78.9066V78.9066C38.9037 78.9468 39.173 79.2174 39.2115 79.5598L39.2357 79.7752L39.2806 87.7756H0.539062V71.6377Z" fill="#D9D9D9" />
                    <path d="M119.461 71.5461C104.416 74.3083 81.2137 78.9065 81.2137 78.9065V78.9065C80.9811 78.9196 80.793 79.1007 80.7709 79.3326L80.7418 79.6379L80.6295 87.7754H119.461V71.5461Z" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask3_1669_162202)">
                    <path d="M0.628906 71.7747C0.628906 71.7747 18.8915 79.6836 59.884 79.6836C100.876 79.6836 119.37 71.7747 119.37 71.7747V72.7658C119.37 72.7658 101.038 80.3922 59.884 80.3922C18.7295 80.3922 0.628906 72.7658 0.628906 72.7658V71.7747Z" fill="#216A78" />
                </g>
                <mask id="mask4_1669_162202" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="46" y="62" width="28" height="16">
                    <rect width="27.9551" height="15.7264" transform="matrix(1 0 0 -1 46.0215 77.8547)" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask4_1669_162202)">
                    <ellipse cx="59.999" cy="76.8036" rx="13.9775" ry="13.6235" fill="#1D5C68" fillOpacity="0.85" />
                </g>
                <g filter="url(#filter2_i_1669_162202)">
                    <ellipse cx="59.999" cy="77.5806" rx="13.9775" ry="13.7149" fill="#C5C5C5" />
                </g>
                <ellipse cx="60.0007" cy="78.1522" rx="7.46067" ry="7.7032" fill="#1D5C68" fillOpacity="0.64" />
                <g filter="url(#filter3_i_1669_162202)">
                    <ellipse cx="60.0006" cy="78.312" rx="7.2809" ry="7.36033" fill="#C5C5C5" />
                </g>
                <defs>
                    <filter id="filter0_i_1669_162202" x="0" y="32.5061" width="120" height="92.4368" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="-40" />
                        <feGaussianBlur stdDeviation="125" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1669_162202" />
                    </filter>
                    <filter id="filter1_i_1669_162202" x="0.628906" y="2.88013" width="118.831" height="116.403" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="46" />
                        <feGaussianBlur stdDeviation="125" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1669_162202" />
                    </filter>
                    <filter id="filter2_i_1669_162202" x="46.0215" y="-62.7343" width="27.9551" height="154.03" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feMorphology radius="3" operator="dilate" in="SourceAlpha" result="effect1_innerShadow_1669_162202" />
                        <feOffset dy="-152" />
                        <feGaussianBlur stdDeviation="64.8" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1669_162202" />
                    </filter>
                    <filter id="filter3_i_1669_162202" x="52.7197" y="18.9517" width="14.5615" height="66.7207" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feMorphology radius="90" operator="dilate" in="SourceAlpha" result="effect1_innerShadow_1669_162202" />
                        <feOffset dy="-52" />
                        <feGaussianBlur stdDeviation="83" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1669_162202" />
                    </filter>
                </defs>
            </svg>
        </div>

    );
};

export default PokeBallCapture;
