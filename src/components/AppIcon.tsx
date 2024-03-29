import React from 'react';
const iconData: { [key: string]: React.ReactElement[] } = {
    logo: [
      <g key="logo-1">
        <polygon opacity="0.7" points="38.438,708.167 87.013,472.722 348.002,640.593 345.148,462.504 523.437,481.198 
          429.673,187.395 610.85,159.573 661.415,640.171 474.239,620.302 442.221,828.325 	"/>
        <path d="M677.455,237.535l-168.03,586.458c0,0,236.848,141.255,426.455-171.569
          C1125.494,339.602,677.455,237.535,677.455,237.535z M840.81,625.565c-83.27,137.381-187.283,75.343-187.283,75.343l73.793-257.554
          C727.319,443.354,924.088,488.179,840.81,625.565z"/>
      </g>
    ],
    logoDarkMask:[
      <g key="logoDarkMask-1">
        <path opacity="0.7" d="M0,1007.64C505,1054,781,982,1024,918.873V0H0V1007.64z"/>
        <path opacity="0.6" d="M0,968.621c394.373,83.795,587,63.379,1024-32.593V0H0V968.621z"/>
        <path d="M0,986.515C457,1071,743,986,1024,887.224V0H0V986.515z"/>
      </g>
    ],
    logoWhiteMask:[
      <g key="logoWhiteMask-1">
        <path id="m-3" opacity="0.6" d="M1024,851.974C864.309,954.273,510.254,1130.08,0,923.036V1024h1024V851.974z"/>
        <path id="m-2" opacity="0.8" d="M1024,880.87C873.169,967.071,513.659,1105.964,0,952.875V1024h1024V880.87z"/>
        <path id="m-1" d="M1024,898.882c-164.497,79.416-535.208,204.499-1024,41.97V1024h1024V898.882z"/>
      </g>
    ],
    setup: [
        <path
          key="setup-1"
          d="M416 569.6c87.68 0 160.64 63.36 176 147.2H928v64H592c-15.36 83.84-88.32 147.2-176 147.2-98.56 0-179.2-80.64-179.2-179.2 0-98.56 80.64-179.2 179.2-179.2z m0 64a115.52 115.52 0 0 0-115.2 115.2c0 63.36 51.84 115.2 115.2 115.2s115.2-51.84 115.2-115.2-51.84-115.2-115.2-115.2z m-243.2 83.2v64H96v-64h76.8zM608 96c87.68 0 160.64 63.36 176 147.2H928v64h-144c-15.36 83.84-88.32 147.2-176 147.2-98.56 0-179.2-80.64-179.2-179.2C428.8 176.64 509.44 96 608 96z m0 64a115.52 115.52 0 0 0-115.2 115.2c0 63.36 51.84 115.2 115.2 115.2s115.2-51.84 115.2-115.2S671.36 160 608 160z m-243.2 83.2v64H96v-64h268.8z"
        />,
    ],
    setting: [
      <path
        key="setup-1"
        d="M915.943982 631.653147c-16.265452 3.38612-33.738405 6.592139-52.239781 9.583263-3.494591 9.519818-7.370875 18.888186-11.620665 28.074406 10.952446 15.187911 21.043269 29.811979 30.156834 43.711548 14.564717 22.214954 11.535731 51.604308-7.248078 70.38914l-91.580788 91.580788c-10.832719 10.832719-25.191752 16.423041-39.667441 16.423041-10.624988 0-21.322631-3.012613-30.721699-9.174963-13.894452-9.106402-28.516474-19.202341-43.707454-30.159904-9.153474 4.235464-18.481933 8.095375-27.958772 11.57871-3.052522 18.794042-6.315846 36.376489-9.753131 52.532447-5.51255 25.888624-28.374234 44.399209-54.846142 44.399209L447.243137 960.590831c-26.471908 0-49.333592-18.510586-54.846142-44.399209-3.437286-16.155958-6.700609-33.731242-9.753131-52.532447-9.438976-3.465938-18.727527-7.309476-27.843138-11.524474-15.452947 11.136641-30.185486 21.256116-44.040029 30.244838-9.357112 6.075369-19.959587 9.035794-30.503734 9.035794-14.477736 0-28.839839-5.595438-39.667441-16.423041l-91.580788-91.580788c-18.7132-18.7132-21.796422-47.973618-7.387247-70.174246 8.990768-13.856589 19.11229-28.592198 30.241768-44.040029-4.211928-9.115612-8.055466-18.399045-11.524474-27.841092-18.796088-3.050476-36.371372-6.317892-52.5304-9.753131-25.888624-5.510504-44.399209-28.377304-44.399209-54.846142L63.409169 447.24416c0-26.471908 18.510586-49.335638 44.399209-54.846142 16.159028-3.437286 33.734312-6.700609 52.5304-9.756201 3.467985-9.43693 7.312546-18.727527 11.524474-27.841092-11.132548-15.4509-21.25407-30.185486-30.241768-44.040029-14.409175-22.202675-11.325953-51.457975 7.387247-70.171176l91.580788-91.580788c10.827603-10.829649 25.187659-16.428158 39.667441-16.423041 10.544147 0 21.149693 2.963495 30.503734 9.035794 13.854543 8.988722 28.587082 19.107173 44.040029 30.241768 9.115612-4.211928 18.404162-8.055466 27.843138-11.521404 3.052522-18.798135 6.315846-36.376489 9.753131-52.534494 5.51255-25.888624 28.374234-44.399209 54.846142-44.399209l129.512702 0c26.471908 0 49.333592 18.510586 54.846142 44.399209 3.437286 16.159028 6.700609 33.736359 9.753131 52.534494 9.438976 3.465938 18.727527 7.309476 27.841092 11.521404 15.454994-11.134595 30.187533-21.25407 44.040029-30.241768 9.361205-6.072299 19.962657-9.039887 30.506804-9.035794 14.475689 0 28.841885 5.593392 39.667441 16.423041l91.580788 91.580788c18.7132 18.7132 21.794375 47.968501 7.387247 70.171176-8.988722 13.854543-19.110243 28.589129-30.241768 44.040029 4.228301 9.153474 8.089235 18.481933 11.56643 27.963888 18.49626 2.989077 35.977399 6.195096 52.239781 9.583263 26.004257 5.409197 44.646849 28.332279 44.646849 54.896284l0 129.513726C960.590831 603.323938 941.948239 626.241904 915.943982 631.653147zM904.518768 447.24416c-25.38311-5.284353-53.526077-10.036587-83.857896-14.222933-7.578606-29.67588-19.240203-57.641815-34.485419-83.32987 18.651802-24.620747 35.217083-47.961338 49.16577-69.453838l-91.580788-91.578742c-21.4925 13.948687-44.831045 30.510898-69.451792 49.163723-25.65224-15.21861-53.574173-26.873044-83.204004-34.45165-4.221138-30.602995-9.012258-58.821687-14.347776-83.888596L447.243137 119.482255c-5.335519 25.066909-10.126638 53.2856-14.347776 83.888596-29.630854 7.578606-57.549717 19.23304-83.204004 34.45165-24.620747-18.651802-47.957245-35.214013-69.453838-49.163723l-91.580788 91.578742c13.950733 21.4925 30.516014 44.833091 49.167816 69.453838-15.22168 25.650193-26.873044 53.574173-34.45165 83.204004-30.602995 4.219091-58.824757 9.009188-83.891665 14.347776l0 129.513726c25.066909 5.335519 53.287647 10.128685 83.891665 14.347776 7.578606 29.630854 19.22997 57.549717 34.45165 83.204004-18.651802 24.618701-35.217083 47.961338-49.167816 69.451792l91.580788 91.580788c21.496593-13.94664 44.833091-30.513968 69.453838-49.16577 25.654286 15.21861 53.574173 26.875091 83.204004 34.45165 4.221138 30.606065 9.012258 58.826803 14.347776 83.888596l129.512702 0c5.335519-25.061792 10.126638-53.283554 14.347776-83.888596 29.67588-7.587815 57.629535-19.265786 83.310428-34.518165 24.409946 18.48705 47.666626 35.023678 69.345368 49.232285l91.580788-91.580788c-14.210653-21.680788-30.742165-44.934398-49.229215-69.345368 15.270798-25.720801 26.960025-53.715389 34.548864-83.433224 30.331819-4.188392 58.474786-8.943696 83.857896-14.224979L904.517745 447.24416zM512.001023 677.270091c-92.90597 0-165.271114-72.360028-165.271114-165.268044s72.365144-165.273161 165.271114-165.273161 165.271114 72.365144 165.271114 165.273161S604.906993 677.270091 512.001023 677.270091zM512.001023 393.94935c-61.938678 0-118.05065 56.114019-118.05065 118.052696 0 61.936631 56.111972 118.05065 118.05065 118.05065s118.05065-56.114019 118.05065-118.05065C630.051673 450.063369 573.939701 393.94935 512.001023 393.94935z"
      />,
    ],
    ring: [
      <path
        key="ring-1"
        d="M581.841455 191.464727l-26.205091-6.749091v-49.338181c0-17.058909-13.591273-30.650182-30.557091-30.650182-16.802909 0-30.533818 13.730909-30.533818 30.650182v46.266181l-29.137455 4.887273C331.892364 208.919273 232.727273 325.003636 232.727273 461.870545V663.272727H163.072c-19.386182 0-35.072 15.639273-35.072 34.909091 0 19.223273 15.709091 34.909091 35.072 34.909091h697.856c19.386182 0 35.072-15.639273 35.072-34.909091 0-19.223273-15.709091-34.909091-35.072-34.909091H791.272727v-201.402182a279.365818 279.365818 0 0 0-209.431272-270.405818zM861.090909 461.893818V593.454545a104.866909 104.866909 0 0 1 104.727273 104.727273c0 57.856-46.964364 104.727273-104.890182 104.727273H163.072A104.866909 104.866909 0 0 1 58.181818 698.181818 104.797091 104.797091 0 0 1 162.909091 593.454545v-131.584c0-161.233455 110.056727-299.357091 262.493091-338.199272A100.468364 100.468364 0 0 1 525.079273 34.909091a100.282182 100.282182 0 0 1 100.305454 96.791273A349.253818 349.253818 0 0 1 861.090909 461.870545zM337.454545 861.090909a34.909091 34.909091 0 0 1 69.818182 0c0 49.664 48.779636 93.090909 104.727273 93.090909 55.389091 0 104.727273-44.241455 104.727273-93.090909a34.909091 34.909091 0 0 1 69.818182 0c0 89.204364-82.199273 162.909091-174.545455 162.909091-92.811636 0-174.545455-72.750545-174.545455-162.909091z"
      />,
    ],
    checked: [
      <path
        key="checked-1"
        d="M441.6 812.8c-19.2 0-32-6.4-44.8-19.2L70.4 467.2c-25.6-25.6-25.6-64 0-89.6 25.6-25.6 64-25.6 89.6 0l281.6 281.6 441.6-428.8c25.6-25.6 64-25.6 89.6 0 25.6 25.6 25.6 64 0 89.6l-486.4 473.6C473.6 806.4 460.8 812.8 441.6 812.8z"
      />,
    ],
    logs:[
      <path key="logs-1" d="M511.3 854.4H187.9c-12.9 0-23.9-14.3-23.9-31.1V258.9c0-16.9 10.9-31.1 23.9-31.1h96.4v42.6c0 19.9 16.1 36 36 36s36-16.1 36-36v-42.6h311.8v42.6c0 19.9 16.1 36 36 36s36-16.1 36-36v-42.6h96.2c12.9 0 23.9 14.3 23.9 31.1v216c0 19.9 16.1 36 36 36s36-16.1 36-36v-216c0-56.9-43-103.1-95.9-103.1h-96.2v-54.3c0-19.9-16.1-36-36-36s-36 16.1-36 36v54.3H356.3v-54.3c0-19.9-16.1-36-36-36s-36 16.1-36 36v54.3h-96.4C135 155.8 92 202 92 258.9v564.3c0 56.9 43 103.1 95.9 103.1h323.4c19.9 0 36-16.1 36-36s-16.1-35.9-36-35.9z" />,
      <path key="logs-2" d="M768.1 547c-105.5 0-191 85.5-191 191s85.5 191 191 191 191-85.5 191-191-85.5-191-191-191z m104.7 264.7c-4.1 0-8.2-0.7-12.3-2.2l-103.8-37.4c-14.3-4.8-24.6-18.3-24.6-34.1V628.7c0-19.9 16.1-36 36-36s36 16.1 36 36v84.1l81 29.1c18.7 6.8 28.3 27.5 21.5 46.1-5.3 14.6-19.1 23.7-33.8 23.7zM598.2 461.2c0-19.9-16.1-36-36-36H321.8c-19.9 0-36 16.1-36 36s16.1 36 36 36h240.4c19.9 0 36-16.1 36-36zM449.3 676c19.9 0 36-16.1 36-36s-16.1-36-36-36H321.8c-19.9 0-36 16.1-36 36s16.1 36 36 36h127.5z" />
    ], 
    checkedToast: [
      <path
        key="checkedToast-1"
        d="M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m231.296 226.346667l-291.626667 291.626667-170.965333-170.965334-60.330667 60.373334 231.253334 231.253333 352-351.957333-60.330667-60.330667z"
      />,
    ],
    member:[
      <path key="member-1" d="M487.020606 725.116121A361.999515 361.999515 0 0 1 124.741818 362.806303C124.710788 162.474667 286.68897 0.496485 487.020606 0.496485s362.309818 161.978182 362.309818 362.309818-161.978182 362.309818-362.309818 362.309818z m0-639.379394a276.51103 276.51103 0 0 0-277.069576 277.100606 276.51103 276.51103 0 0 0 277.100606 277.038546 276.51103 276.51103 0 0 0 277.038546-277.069576 276.51103 276.51103 0 0 0-277.069576-277.069576z" />,
      <path key="member-2" d="M43.752727 1023.503515c-6.423273 0-14.956606-2.141091-21.348848-6.392242-21.317818-10.674424-27.710061-38.353455-14.894546-57.561212 95.883636-170.480485 281.320727-277.038545 479.511273-277.038546 200.331636 0 379.376485 104.41697 479.542303 277.038546a41.332364 41.332364 0 0 1-14.925576 57.561212 41.332364 41.332364 0 0 1-57.530181-14.894546c-85.271273-147.083636-238.716121-234.46497-407.086546-234.464969s-323.956364 89.522424-407.055515 234.433939c-6.392242 12.784485-21.317818 21.317818-36.243394 21.317818zM487.020606 597.240242c-74.596848 0-144.911515-40.494545-183.296-106.55806a41.332364 41.332364 0 0 1 14.925576-57.530182 41.332364 41.332364 0 0 1 57.561212 14.894545 127.906909 127.906909 0 0 0 110.809212 63.953455c44.745697 0 87.381333-25.56897 110.840242-63.922424 12.784485-21.317818 38.353455-27.710061 57.530182-14.925576 21.317818 12.784485 27.710061 38.353455 14.894546 57.530182-38.322424 66.094545-108.668121 106.558061-183.26497 106.55806z" />
    ],
    fullScreen:[
      <path key="fullScreen-1" d="M838.42578125 905.31054688H744.734375c-19.42382813 0-35.15625-15.73242188-35.15625-35.15625001s15.73242188-35.15625 35.15625-35.15625H835.4375V744.29492188c0-19.42382813 15.73242188-35.15625 35.15625-35.15625001s35.15625 15.73242188 35.15625 35.15625v93.69140626c0 37.08984375-30.234375 67.32421875-67.32421875 67.32421875z m-558.45703125-1e-8H186.27734375c-37.08984375 0-67.32421875-30.234375-67.32421875-67.32421875V744.29492188c0-19.42382813 15.73242188-35.15625 35.15625-35.15625001s35.15625 15.73242188 35.15625 35.15625v90.70312501H279.96875c19.42382813 0 35.15625 15.73242188 35.15625 35.15625s-15.73242188 35.15625-35.15625 35.15625z m391.640625-142.91015624H352.83007812c-49.5703125 0-89.91210938-40.34179688-89.91210937-89.91210938V353.70898437c0-49.5703125 40.34179688-89.91210938 89.91210938-89.91210937h318.77929687c49.5703125 0 89.91210938 40.34179688 89.91210938 89.91210938v318.77929687c0 49.5703125-40.34179688 89.91210938-89.91210938 89.91210938zM352.83007812 334.109375c-10.63476563 0-19.59960938 8.96484375-19.59960937 19.59960938v318.77929687c0 10.63476563 8.96484375 19.59960938 19.59960938 19.59960938h318.77929687c10.63476563 0 19.59960938-8.96484375 19.59960938-19.59960938V353.70898437c0-10.63476563-8.96484375-19.59960938-19.59960938-19.59960937H352.83007812zM870.59375 314.68554687c-19.42382813 0-35.15625-15.73242188-35.15625-35.15624999V188.82617187H744.734375c-19.42382813 0-35.15625-15.73242188-35.15625-35.15624999s15.73242188-35.15625 35.15625-35.15625h93.69140625c37.08984375 0 67.32421875 30.234375 67.32421875 67.32421874v93.69140625c0 19.42382813-15.73242188 35.15625-35.15625 35.15625z m-716.484375 1e-8c-19.42382813 0-35.15625-15.73242188-35.15625-35.15625V185.83789062c0-37.08984375 30.234375-67.32421875 67.32421875-67.32421874H279.96875c19.42382813 0 35.15625 15.73242188 35.15625 35.15625s-15.73242188 35.15625-35.15625 35.15625H189.265625v90.703125c0 19.42382813-15.73242188 35.15625-35.15625 35.15625z" />
    ],
    exitFullScreen:[
      <path key="exitFullScreen-1" d="M384 896a42.666667 42.666667 0 0 1-42.666667-42.666667v-170.666666H170.666667a42.666667 42.666667 0 1 1 0-85.333334h213.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v213.333333a42.666667 42.666667 0 0 1-42.666667 42.666667z" />,
      <path key="exitFullScreen-2" d="M640 896a42.666667 42.666667 0 0 1-42.666667-42.666667v-213.333333a42.666667 42.666667 0 0 1 42.666667-42.666667h213.333333a42.666667 42.666667 0 1 1 0 85.333334h-170.666666v170.666666a42.666667 42.666667 0 0 1-42.666667 42.666667zM896 384a42.666667 42.666667 0 0 1-42.666667 42.666667h-213.333333a42.666667 42.666667 0 0 1-42.666667-42.666667V170.666667a42.666667 42.666667 0 1 1 85.333334 0v170.666666h170.666666a42.666667 42.666667 0 0 1 42.666667 42.666667zM426.666667 384a42.666667 42.666667 0 0 1-42.666667 42.666667H170.666667a42.666667 42.666667 0 0 1 0-85.333334h170.666666V170.666667a42.666667 42.666667 0 0 1 85.333334 0v213.333333z" />
    ],
    more1:[
      <path key="more1-1" d="M592 272c0-44.004-35.996-80-80-80s-80 35.996-80 80 35.996 80 80 80 80-35.996 80-80z m0 480c0-44.004-35.996-80-80-80s-80 35.996-80 80 35.996 80 80 80 80-35.996 80-80z m0-240c0-44.004-35.996-80-80-80s-80 35.996-80 80 35.996 80 80 80 80-35.996 80-80z" />
    ],
    more2:[
      <path key="more2-1" d="M96 416a96 96 0 1 1 0 192 96 96 0 0 1 0-192z m416 0a96 96 0 1 1 0 192 96 96 0 0 1 0-192z m416 0a96 96 0 1 1 0 192 96 96 0 0 1 0-192z" />
    ],
    member1:[
      <path key="member1-1" d="M512 311.466667m-179.2 0a179.2 179.2 0 1 0 358.4 0 179.2 179.2 0 1 0-358.4 0Z" />,
      <path key="member1-2" d="M827.733333 750.933333c-51.2-128-174.933333-213.333333-315.733333-213.333333s-260.266667 89.6-315.733333 213.333333C170.666667 819.2 217.6 896 290.133333 896h443.733334c72.533333 0 119.466667-76.8 93.866666-145.066667z" />
    ],
    order1:[
      <path key="order1-1" d="M765.3 198.5h-57.7V112h-95.7v86.5H412.3V112h-95.7v86.5h-58c-54.3 0-98.7 45-98.7 100V812c0 55 44.4 100 98.7 100h506.7c54.3 0 98.7-45 98.7-100V298.5c0-55-44.4-100-98.7-100zM460.4 773L325.3 640.3l52.3-57.5 82.9 84 202.8-207.3L720 512 460.4 773z m298.3-414.5H265.3v-60h493.3v60z" />
    ],
    payment1:[
      <path key="payment1-1" d="M197.2 432.8H64v319c0 62 50.9 112.2 113.6 112.2h668.7c62.8 0 113.6-50.2 113.6-112.2v-319H197.2zM802.4 717H631.8l54.6-120.2h170.5L802.4 717zM960 272.2v83.2H64v-83.2c0-62 50.9-112.2 113.6-112.2H851.3c0.6 0 1.2 0 1.8 0.1h0.6c0.7 0 1.3 0.1 2 0.1 1.5 0.1 3 0.3 4.6 0.5 0.8 0.1 1.7 0.2 2.5 0.3 0.6 0.1 1.1 0.2 1.7 0.3 54.1 8.7 95.5 55 95.5 110.9z" />
    ],
    ring2:[
      <path key="ring2-1" d="M590.2 183.1c0-39.2-35-71.1-78.2-71.1-43.1 0-78.2 31.8-78.2 71.1 0 4 0.4 7.9 1.1 11.8-108 34.2-196.6 139.3-196.6 263.7v97.9s0 141-38.1 142.2c-22.7 0-40.1 15.9-40.1 35.6 0 19.8 17.5 35.6 39.1 35.6H825c21.7 0 39.1-15.9 39.1-35.6 0-19.8-17.5-35.6-39.1-35.6-39.1 0-39.1-141.2-39.1-141.2v-98.9c0-124.5-82.9-229.7-196.6-263.8 0.6-3.9 0.9-7.8 0.9-11.7z m39.1 622.2C629.2 864.2 577.2 912 512 912c-64.7 0-117.2-47.6-117.3-106.7h234.6z m0 0" />
    ],
    rise:[
      <path key="rise-1" d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" />
    ],
    drop:[
      <path key="drop-1" d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" />
    ],
    flag:[
      <path key="flag-1" d="M822.186667 199.68a76.373333 76.373333 0 0 0-68.266667-10.666667 321.28 321.28 0 0 1-92.586667 11.946667 364.373333 364.373333 0 0 1-133.546666-33.28A433.066667 433.066667 0 0 0 362.666667 128c-123.306667 0-170.666667 42.666667-179.2 48.64a42.666667 42.666667 0 0 0-12.8 30.72V853.333333a42.666667 42.666667 0 0 0 85.333333 0v-183.466666a267.946667 267.946667 0 0 1 106.666667-17.493334 364.373333 364.373333 0 0 1 133.546666 33.28 433.066667 433.066667 0 0 0 165.12 39.68 326.826667 326.826667 0 0 0 149.333334-29.866666 74.24 74.24 0 0 0 42.666666-66.133334V260.693333a75.52 75.52 0 0 0-31.146666-61.013333z" />
    ],
    next:[
      <path key="next-1" d="M769.792 476.032 416.48 125.92c-18.848-18.656-49.216-18.528-67.872 0.32-18.656 18.816-18.528 49.216 0.32 67.872l319.456 316.576-318.176 321.056c-18.656 18.816-18.528 49.216 0.32 67.872 9.344 9.28 21.568 13.92 33.792 13.92 12.352 0 24.704-4.736 34.08-14.208l350.112-353.312c0.512-0.512 0.672-1.248 1.184-1.792 0.128-0.128 0.288-0.16 0.416-0.288C788.736 525.088 788.64 494.688 769.792 476.032z" />
    ],
    back:[
      <path key="back-1" d="M268.896 476.032 622.24 125.92c18.848-18.656 49.216-18.528 67.872 0.32 18.656 18.816 18.528 49.216-0.32 67.872l-319.456 316.576 318.176 321.056c18.656 18.816 18.528 49.216-0.32 67.872-9.344 9.28-21.568 13.92-33.792 13.92-12.352 0-24.704-4.736-34.08-14.208L270.208 545.984c-0.512-0.512-0.672-1.248-1.184-1.792-0.128-0.128-0.288-0.16-0.416-0.288C249.952 525.088 250.08 494.688 268.896 476.032z" />
    ],
    details:[
      <path key="details-1" d="M211.65579378 428.36514133l331.56361481-1.89326222 0.44297482 77.6722963-331.56361482 1.89326222zM211.71162075 605.93129245l252.67768888-1.89326223 0.58254222 77.6722963-252.67768888 1.89326223zM211.82084741 251.12788385l561.54642962-2.53648593 0.3519526 77.6722963-561.54642963 2.53648593z" />,
      <path key="details-2" d="M471.10068148 998.30139259H117.8130963c-21.48124445 0-38.83614815-17.3549037-38.83614815-38.83614814V88.80734815c0-21.48124445 17.3549037-38.83614815 38.83614815-38.83614815h783.64065185c21.48124445 0 38.83614815 17.3549037 38.83614815 38.83614815v430.2317037c0 21.48124445-17.3549037 38.83614815-38.83614815 38.83614815s-38.83614815-17.3549037-38.83614815-38.83614815V127.6434963H156.64924445v792.86423703h314.45143703c21.48124445 0 38.83614815 17.3549037 38.83614815 38.83614815s-17.3549037 38.95751111-38.83614815 38.95751111z" />,
      <path key="details-3" d="M715.76841482 939.07626667c-112.62482963 0-204.25386667-91.62903703-204.25386667-204.25386667s91.62903703-204.25386667 204.25386667-204.25386667 204.25386667 91.62903703 204.25386666 204.25386667-91.7504 204.25386667-204.25386666 204.25386667z m0-330.83543704c-69.7837037 0-126.58157037 56.79786667-126.58157037 126.58157037s56.79786667 126.58157037 126.58157037 126.58157037 126.58157037-56.79786667 126.58157036-126.58157037-56.91922963-126.58157037-126.58157036-126.58157037z" />,
      <path key="details-4" d="M925.60497778 984.95146667c-9.70903703 0-19.41807408-3.64088889-26.94257778-10.92266667L805.81973333 884.5842963c-15.4130963-14.92764445-15.89854815-39.44296297-0.9709037-54.85605927 14.92764445-15.4130963 39.44296297-15.89854815 54.85605926-0.9709037l92.84266666 89.4445037c15.4130963 14.92764445 15.89854815 39.44296297 0.9709037 54.85605927-7.5245037 8.00995555-17.71899259 11.89357037-27.91348147 11.89357037z" />
    ],
    chrome:[
      <path key="chrome-1" d="M258.304 446.528l-146.528-253.792c93.824-117.472 238.24-192.736 400.256-192.736 187.424 0 351.296 100.736 440.544 251.008l-417.76 0c-7.52-0.64-15.104-0.992-22.752-0.992-121.888 0-224.576 83.648-253.728 196.544zM695.328 324.992l293.472 0c22.752 57.92 35.232 120.992 35.232 187.008 0 280.832-226.112 508.8-506.176 511.936l209.408-362.688c29.472-42.368 46.784-93.824 46.784-149.248 0-73.184-30.176-139.424-78.688-187.008zM326.048 512c0-102.56 83.424-186.016 186.016-186.016s186.016 83.424 186.016 186.016c0 102.56-83.456 186.016-186.016 186.016s-186.016-83.456-186.016-186.016zM582.208 764.448l-146.592 253.888c-246.528-36.896-435.616-249.504-435.616-506.304 0-91.232 23.872-176.832 65.696-251.04l209.024 362.048c41.856 89.12 132.48 150.976 237.28 150.976 24.288 0 47.84-3.328 70.176-9.568z" />
    ],
    goods:[<path key="goods-1" d="M765.123048 121.904762a73.142857 73.142857 0 0 1 65.414095 40.423619l63.829333 127.634286A73.142857 73.142857 0 0 1 902.095238 322.681905V828.952381a73.142857 73.142857 0 0 1-73.142857 73.142857H195.047619a73.142857 73.142857 0 0 1-73.142857-73.142857V328.630857a73.142857 73.142857 0 0 1 7.289905-31.817143l64.536381-133.607619A73.142857 73.142857 0 0 1 259.584 121.904762h505.539048zM828.952381 365.714286H195.047619v463.238095h633.904762V365.714286z m-365.714286 73.142857v73.142857h-195.047619v-73.142857h195.047619zM259.584 195.047619l-47.128381 97.52381h601.453714l-48.786285-97.52381H259.584z" />],
    goodsAdd:[<path key="goodsAdd-1" d="M707.047619 487.619048a219.428571 219.428571 0 1 1 0 438.857142 219.428571 219.428571 0 0 1 0-438.857142z m58.075429-365.714286a73.142857 73.142857 0 0 1 65.414095 40.423619l63.829333 127.634286A73.142857 73.142857 0 0 1 902.095238 322.681905v200.313905a269.092571 269.092571 0 0 0-73.142857-54.881524L828.952381 365.714286h-633.904762L195.047619 828.952381h273.066667a269.092571 269.092571 0 0 0 54.857143 73.142857H195.047619a73.142857 73.142857 0 0 1-73.142857-73.142857V328.630857a73.142857 73.142857 0 0 1 7.289905-31.817143l64.536381-133.607619A73.142857 73.142857 0 0 1 259.584 121.904762h505.539048zM707.047619 560.761905a146.285714 146.285714 0 1 0 0 292.571428 146.285714 146.285714 0 0 0 0-292.571428z m36.571429 60.952381V682.666667H804.571429v73.142857h-60.952381v60.952381h-73.142858V755.809524H609.52381v-73.142857h60.95238v-60.952381h73.142858zM463.238095 438.857143v73.142857h-195.047619v-73.142857h195.047619zM765.123048 195.047619H259.584l-47.152762 97.52381h601.453714l-48.761904-97.52381z" />],  
    order:[<path key="order-1" d="M649.679238 146.285714c38.034286 0 68.85181 30.72 68.85181 68.583619l-0.024381 525.702096h-68.827429V214.844952H190.756571v594.310096h642.486858v-457.142858l-68.827429-0.02438v-68.559239h68.827429c38.034286 0 68.85181 30.72 68.851809 68.583619v457.142858A68.705524 68.705524 0 0 1 833.243429 877.714286H190.756571A68.705524 68.705524 0 0 1 121.904762 809.130667V214.893714A68.705524 68.705524 0 0 1 190.756571 146.285714h458.922667z m-206.506667 342.869334v68.559238h-183.588571v-68.583619h183.588571z m137.679239-137.142858v68.559239H259.584v-68.583619h321.26781z" />],
    
    productList:[<path key="productList-1" d="M950.857143 877.714286v73.142857h-219.428572v-73.142857h219.428572z m-268.190476 0v73.142857h-73.142857v-73.142857h73.142857zM544.402286 110.689524l295.253333 131.145143a73.142857 73.142857 0 0 1 43.471238 66.852571V585.142857h-73.142857v-207.603809L562.785524 487.375238v393.020952h-0.097524v24.746667l-18.285714 8.118857a73.142857 73.142857 0 0 1-59.367619 0L189.732571 782.165333A73.142857 73.142857 0 0 1 146.285714 715.312762V308.687238a73.142857 73.142857 0 0 1 43.446857-66.852571l295.302096-131.120762a73.142857 73.142857 0 0 1 59.367619 0zM219.428571 374.125714v341.211429l270.214096 120.003047V485.888L219.428571 374.101333zM950.857143 755.809524v73.142857h-219.428572v-73.142857h219.428572z m-268.190476 0v73.142857h-73.142857v-73.142857h73.142857z m268.190476-121.904762v73.142857h-219.428572v-73.142857h219.428572z m-268.190476 0v73.142857h-73.142857v-73.142857h73.142857zM514.706286 177.566476L235.446857 301.568l292.815238 121.173333 269.141334-119.637333-282.697143-125.561905z" />],
    product:[<path key="product-1" d="M541.696 86.308571l316.952381 140.775619A73.142857 73.142857 0 0 1 902.095238 293.936762v436.126476a73.142857 73.142857 0 0 1-43.446857 66.852572l-316.952381 140.751238a73.142857 73.142857 0 0 1-59.392 0l-316.952381-140.751238A73.142857 73.142857 0 0 1 121.904762 730.063238V293.936762a73.142857 73.142857 0 0 1 43.446857-66.852572l316.952381-140.751238a73.142857 73.142857 0 0 1 59.392 0zM195.047619 362.788571v367.274667l286.476191 127.21981V485.546667L195.047619 362.788571z m633.904762 2.633143l-274.285714 117.516191V851.870476L828.952381 730.063238V365.421714zM512 153.185524L207.335619 288.475429l307.760762 131.900952 304.591238-130.56L512 153.185524z" />],
    productChecked:[<path key="productChecked-1" d="M509.123048 127.585524l292.376381 127.122286a65.999238 65.999238 0 0 1 40.082285 60.367238v273.846857l-73.874285 72.777143V379.294476L521.752381 486.960762v324.583619l17.871238-7.777524 55.808 55.100953-86.308571 37.546666c-17.432381 7.558095-37.302857 7.558095-54.759619 0L161.987048 769.29219A65.999238 65.999238 0 0 1 121.904762 708.924952V315.075048c0-26.112 15.701333-49.785905 40.082286-60.367238l292.376381-127.122286a68.803048 68.803048 0 0 1 54.759619 0zM850.67581 648.533333l51.321904 52.102096-198.948571 195.974095-120.588191-118.979048 51.370667-52.077714 69.266286 68.339809 147.577905-145.359238zM195.754667 376.783238v327.850667L448.609524 814.543238V487.472762l-252.854857-110.689524zM481.743238 195.047619L223.280762 307.395048 484.59581 421.790476l258.438095-113.152L481.743238 195.047619z" />],
    productFilter:[<path key="productFilter-1" d="M964.656762 633.904762a48.761905 48.761905 0 0 1 37.766095 79.62819l-76.8 93.93981V965.485714l-72.313905-19.407238v-165.766095L913.237333 707.047619H741.668571L804.571429 779.946667v153.039238l-72.874667-19.577905V807.497143l-80.188952-92.940191A48.761905 48.761905 0 0 1 688.420571 633.904762h276.236191zM544.426667 110.689524l295.253333 131.145143a73.142857 73.142857 0 0 1 43.471238 66.852571V585.142857h-73.142857v-207.603809L562.785524 487.375238v393.020952H560.761905v25.6l-16.359619 7.265524a73.142857 73.142857 0 0 1-59.367619 0L189.732571 782.165333A73.142857 73.142857 0 0 1 146.285714 715.312762V308.687238a73.142857 73.142857 0 0 1 43.446857-66.852571l295.302096-131.120762a73.142857 73.142857 0 0 1 59.367619 0zM219.428571 374.125714v341.211429l270.214096 120.003047V485.888L219.428571 374.101333z m295.277715-196.534857L235.446857 301.568l292.815238 121.173333 269.141334-119.637333-282.697143-125.561905z" />],
    userGroup:[<path key="userGroup-1" d="M560.973913 307.2c0-115.756522-93.495652-207.026087-207.026087-207.026087s-207.026087 93.495652-207.026087 207.026087l0 115.756522c0 46.747826 15.582609 91.269565 42.295652 124.66087-109.078261 64.556522-184.765217 198.121739-184.765217 333.913043 0 22.26087 17.808696 40.069565 40.069565 40.069565s40.069565-17.808696 40.069565-40.069565c0-117.982609 73.46087-235.965217 169.182609-278.26087 28.93913 15.582609 64.556522 26.713043 100.173913 26.713043 115.756522 0 207.026087-93.495652 207.026087-207.026087L560.973913 307.2zM483.06087 425.182609c0 71.234783-57.878261 129.113043-129.113043 129.113043s-129.113043-57.878261-129.113043-129.113043l0-115.756522c0-71.234783 57.878261-129.113043 129.113043-129.113043s129.113043 57.878261 129.113043 129.113043L483.06087 425.182609z" />,
    <path key="userGroup-2" d="M861.495652 569.878261c-17.808696-11.130435-42.295652-6.678261-53.426087 11.130435-11.130435 17.808696-6.678261 42.295652 11.130435 53.426087 71.234783 46.747826 122.434783 151.373913 122.434783 249.321739 0 22.26087 17.808696 40.069565 40.069565 40.069565s40.069565-17.808696 40.069565-40.069565C1019.547826 759.095652 954.991304 629.982609 861.495652 569.878261z" />,
    <path key="userGroup-3" d="M661.147826 585.46087c13.356522 2.226087 26.713043 4.452174 40.069565 4.452174 97.947826 0 175.86087-80.13913 175.86087-175.86087l0-95.721739c0-97.947826-80.13913-175.86087-175.86087-175.86087-55.652174 0-109.078261 26.713043-142.469565 71.234783-13.356522 17.808696-8.904348 42.295652 8.904348 55.652174 17.808696 13.356522 42.295652 8.904348 55.652174-8.904348 17.808696-24.486957 48.973913-40.069565 77.913043-40.069565 53.426087 0 97.947826 44.521739 97.947826 97.947826l0 95.721739c0 53.426087-44.521739 97.947826-97.947826 97.947826-8.904348 0-17.808696-2.226087-26.713043-4.452174-8.904348-4.452174-20.034783-4.452174-31.165217-2.226087-57.878261 22.26087-104.626087 69.008696-120.208696 89.043478-6.678261 8.904348-11.130435 20.034783-8.904348 28.93913 0 11.130435 4.452174 22.26087 13.356522 28.93913 57.878261 46.747826 95.721739 142.469565 95.721739 229.286957 0 22.26087 17.808696 40.069565 40.069565 40.069565s40.069565-17.808696 40.069565-40.069565c0-95.721739-37.843478-195.895652-95.721739-260.452174C625.530435 607.721739 643.33913 594.365217 661.147826 585.46087z" />],
    add:[<path key="add-1" d="M874.666667 469.333333H554.666667V149.333333c0-23.466667-19.2-42.666667-42.666667-42.666666s-42.666667 19.2-42.666667 42.666666v320H149.333333c-23.466667 0-42.666667 19.2-42.666666 42.666667s19.2 42.666667 42.666666 42.666667h320v320c0 23.466667 19.2 42.666667 42.666667 42.666666s42.666667-19.2 42.666667-42.666666V554.666667h320c23.466667 0 42.666667-19.2 42.666666-42.666667s-19.2-42.666667-42.666666-42.666667z" />],
    delete:[<path key="delete-1" d="M382.32 405.358v384a20.626 20.626 0 0 1-21.577 21.284h-43.3a20.626 20.626 0 0 1-21.578-21.357v-384A20.626 20.626 0 0 1 317.443 384h43.154a20.626 20.626 0 0 1 21.577 21.358h0.073z m172.91 0v384a20.626 20.626 0 0 1-21.65 21.284h-43.155a20.626 20.626 0 0 1-21.577-21.357v-384A20.626 20.626 0 0 1 490.425 384h43.155a20.626 20.626 0 0 1 21.577 21.358z m172.91 0v384a20.626 20.626 0 0 1-21.65 21.284h-43.155a20.626 20.626 0 0 1-21.577-21.357l-0.073-384A20.626 20.626 0 0 1 663.262 384h43.227a20.626 20.626 0 0 1 21.578 21.358z m86.381 482.67V256H209.484v631.954a74.825 74.825 0 0 0 14.482 45.056c3.365 3.804 5.778 5.632 7.095 5.632h561.883c1.317 0 3.657-1.828 7.095-5.632a74.825 74.825 0 0 0 14.556-44.983zM360.743 170.641h302.519l-32.402-77.97a19.017 19.017 0 0 0-11.484-7.314H405.287a19.017 19.017 0 0 0-11.483 7.314l-33.06 77.97zM987.431 192v42.642A20.626 20.626 0 0 1 965.854 256h-64.878v631.954c0 36.937-10.532 68.755-31.744 95.744-21.211 26.844-46.592 40.302-76.288 40.302H231.061c-29.696 0-55.15-13.02-76.288-38.985-21.212-26.039-31.744-57.49-31.744-94.354V256H58.15a20.626 20.626 0 0 1-21.577-21.358V192a20.626 20.626 0 0 1 21.577-21.358h208.677L314.15 59.32c6.73-16.457 18.871-30.428 36.425-41.984C368.131 5.778 385.977 0 403.971 0h216.064c17.993 0 35.84 5.778 53.394 17.335 17.554 11.556 29.696 25.6 36.425 41.984l47.323 111.323h208.677A20.626 20.626 0 0 1 987.431 192z" />],
    verify:[<path key="verify-1" d="M652.373333 377.6l-201.813333 202.24-78.933333-79.36a42.666667 42.666667 0 0 0-60.586667 60.586667l109.226667 109.226666a42.666667 42.666667 0 0 0 60.586666 0l232.106667-232.106666a42.666667 42.666667 0 1 0-60.586667-60.586667zM512 85.333333A426.666667 426.666667 0 0 0 85.333333 512a421.973333 421.973333 0 0 0 96.426667 270.08l-85.333333 85.333333a42.666667 42.666667 0 0 0-8.96 46.506667A42.666667 42.666667 0 0 0 128 938.666667h384a426.666667 426.666667 0 0 0 0-853.333334z m0 768H230.826667l39.68-39.68a42.666667 42.666667 0 0 0 0-60.16A341.333333 341.333333 0 1 1 512 853.333333z" />]
}

const AppIcon=(props:AppIconProps)=>{
    let {name,size,width,height,color} = props
    if(size){
        width = size;
        height = size;
    }
    return(
        <svg data-warden-type="svg" {...props} {...{width:width,height:height,fill:color}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">{iconData[name!]}</svg>
    )
}
AppIcon.defaultProps = {
    width:16,
    height:16,
    color: 'currentColor'
}

export default AppIcon