import React, { BaseSyntheticEvent, FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { BackButton } from '../BackButton/BackButton';
import { AvatarLg } from '../AvatarLg/AvatarLg';
import { BackgroundBlur } from '../BackgroundBlur/BackgroundBlur';
import { Popup } from '../Popup/Popup';

import './profileLayout.scss';

interface ProfileLayoutProps extends PropsWithChildren {
  firstName?: string;
  avatarPath?: string;
  navBackPath?: string;
}

export const ProfileLayout: FC<ProfileLayoutProps> = ({ children, firstName, avatarPath, navBackPath = '/' }) => {
  const [title, setTitle] = useState('Загрузите файл');
  const [labelText, setLabelText] = useState('Выбрать файл на компьютере');
  const [file, setFile] = useState<File | undefined>(undefined);
  const [showValidation, setShowValidation] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  const popupElem = useRef() as React.MutableRefObject<HTMLInputElement>;
  const inputElem = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleAvatarClick = useCallback(() => {
    setPopupVisible(true);
  }, []);

  useEffect(() => {
    inputElem.current?.addEventListener('change', (event) => {
      const file: File | null = ((event.currentTarget as HTMLInputElement).files as FileList)[0];
      if (file) {
        setTitle('Файл загружен');
        setFile(file);
        setLabelText(file?.name);
        setShowValidation(false);
      }
    });
  }, [popupVisible]);

  const handleScreenClick = useCallback((event: BaseSyntheticEvent) => {
    const withinBoundaries = popupElem.current === event.target || popupElem.current.contains(event.target);

    if (!withinBoundaries) {
      setPopupVisible(false);
      setShowValidation(false);
      setFile(undefined);
      setLabelText('Выбрать файл на компьютере');
      setTitle('Загрузите файл');
    }
  }, []);

  const handleButtonSubmit = useCallback(() => {
    if (!file) {
      setShowValidation(true);
    } else {
      // send data
    }
  }, [file]);

  return (
    <div className="profile-page">
      <BackButton to={navBackPath} />
      <AvatarLg avatarPath={avatarPath} onClick={handleAvatarClick} name={firstName} className="profile-page__avatar" />

      {popupVisible && (
        <BackgroundBlur onClick={handleScreenClick}>
          <Popup
            popupRef={popupElem}
            onClick={handleButtonSubmit}
            title={title}
            buttonText="Поменять"
            showValidation={showValidation}
            validationText="Нужно выбрать файл"
          >
            <label
              className={classNames(
                file ? 'profile-page__label_grey' : 'profile-page__label_blue',
                'profile-page__label',
              )}
            >
              <input ref={inputElem} type="file" className="profile-page__input_file" />
              {labelText}
            </label>
          </Popup>
        </BackgroundBlur>
      )}

      {children}
    </div>
  );
};
