<?php

	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}

	require_once("CommonAction.php");

	class GameAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_MEMBER);
		}

		protected function executeAction() {

		}
	}