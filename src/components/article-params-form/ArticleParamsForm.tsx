import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

export const ArticleParamsForm = () => {
	const [initialSettings] = useState<ArticleStateType>(defaultArticleState);
	const [isOpen, setIsOpen] = useState(false);
	const [appliedSettings, setAppliedSettings] =
		useState<ArticleStateType>(defaultArticleState);

	const [fontFamily, setFontFamily] = useState<OptionType | null>(
		defaultArticleState.fontFamilyOption
	);
	const [fontColor, setFontColor] = useState<OptionType | null>(
		defaultArticleState.fontColor
	);
	const [backgroundColor, setBackgroundColor] = useState<OptionType | null>(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType | null>(
		defaultArticleState.contentWidth
	);
	const [fontSize, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);

	const toggleSidebar = () => {
		setIsOpen((prev) => !prev);
	};

	const applyStyles = (settings: ArticleStateType) => {
		const main = document.querySelector('main');
		if (!main) return;

		main.style.setProperty(
			'--font-family',
			`'${settings.fontFamilyOption.value}'`
		);
		main.style.setProperty('--font-color', settings.fontColor.value);
		main.style.setProperty('--bg-color', settings.backgroundColor.value);
		main.style.setProperty('--container-width', settings.contentWidth.value);
		main.style.setProperty('--font-size', settings.fontSizeOption.value);
	};

	const handleApply = () => {
		if (
			!fontFamily ||
			!fontColor ||
			!backgroundColor ||
			!contentWidth ||
			!fontSize
		)
			return;

		const newSettings: ArticleStateType = {
			fontFamilyOption: fontFamily,
			fontColor,
			backgroundColor,
			contentWidth,
			fontSizeOption: fontSize,
		};

		setAppliedSettings(newSettings);
		applyStyles(newSettings);
		setIsOpen(false);
	};

	const resetSettings = () => {
		setFontFamily(initialSettings.fontFamilyOption);
		setFontColor(initialSettings.fontColor);
		setBackgroundColor(initialSettings.backgroundColor);
		setContentWidth(initialSettings.contentWidth);
		setFontSize(initialSettings.fontSizeOption);
	};

	useEffect(() => {
		if (isOpen) {
			setFontFamily(appliedSettings.fontFamilyOption);
			setFontColor(appliedSettings.fontColor);
			setBackgroundColor(appliedSettings.backgroundColor);
			setContentWidth(appliedSettings.contentWidth);
			setFontSize(appliedSettings.fontSizeOption);
		}
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onReset={(e) => {
						e.preventDefault();
						resetSettings();
					}}
					onSubmit={(e) => {
						e.preventDefault();
						handleApply();
					}}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						placeholder='Выберите шрифт'
						options={fontFamilyOptions}
						selected={fontFamily}
						onChange={setFontFamily}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='string'
						options={fontSizeOptions}
						selected={fontSize}
						onChange={setFontSize}
					/>

					<Select
						title='Цвет шрифта'
						placeholder='Выберите цвет'
						options={fontColors}
						selected={fontColor}
						onChange={setFontColor}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						placeholder='Выберите цвет фона'
						options={backgroundColors}
						selected={backgroundColor}
						onChange={setBackgroundColor}
					/>

					<Select
						title='Ширина контента'
						placeholder='Выберите ширину контента'
						options={contentWidthArr}
						selected={contentWidth}
						onChange={setContentWidth}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
