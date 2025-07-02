import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
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
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';

type Props = {
	appliedSettings: ArticleStateType;
	onApplySettings: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	appliedSettings,
	onApplySettings,
}: Props) => {
	const asideRef = useRef<HTMLDivElement>(null);

	const [isOpen, setIsOpen] = useState(false);

	const [params, setParams] = useState<ArticleStateType>(defaultArticleState);

	const toggleSidebar = () => {
		setIsOpen((prev) => !prev);
	};

	const resetSettings = () => {
		setParams(defaultArticleState);
	};

	const restoreFromApplied = () => {
		setParams(appliedSettings);
	};

	useEffect(() => {
		if (isOpen) restoreFromApplied();
	}, [isOpen]);

	const handleApply = () => {
		onApplySettings(params);
		setIsOpen(false);
	};

	const updateParam = <K extends keyof ArticleStateType>(
		key: K,
		value: ArticleStateType[K]
	) => {
		setParams((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	useOutsideClickClose({
		isOpen,
		rootRef: asideRef,
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				ref={asideRef}
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
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						placeholder='Выберите шрифт'
						options={fontFamilyOptions}
						selected={params.fontFamilyOption}
						onChange={(val) => updateParam('fontFamilyOption', val)}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='string'
						options={fontSizeOptions}
						selected={params.fontSizeOption}
						onChange={(val) => updateParam('fontSizeOption', val)}
					/>

					<Select
						title='Цвет шрифта'
						placeholder='Выберите цвет'
						options={fontColors}
						selected={params.fontColor}
						onChange={(val) => updateParam('fontColor', val)}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						placeholder='Выберите цвет фона'
						options={backgroundColors}
						selected={params.backgroundColor}
						onChange={(val) => updateParam('backgroundColor', val)}
					/>

					<Select
						title='Ширина контента'
						placeholder='Выберите ширину контента'
						options={contentWidthArr}
						selected={params.contentWidth}
						onChange={(val) => updateParam('contentWidth', val)}
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
